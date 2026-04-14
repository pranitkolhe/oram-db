const pool = require("../config/db");

const { getLogs } = require("../utils/logger");

const {
  getRandomLeaf,
  getPath,
  generateDummyBlock,
  BUCKET_SIZE,
} = require("../utils/oramUtils");

const { encrypt, decrypt } = require("../utils/encryption");
const { logWriteOperation, logReadOperation } = require("../utils/logger");

// 🧺 STASH (in-memory)
let stash = [];

// 🗺️ POSITION MAP (in-memory)
let positionMap = {};

// ================= WRITE =================
async function writeData(key, value) {
  const newLeaf = getRandomLeaf();
  positionMap[key] = newLeaf;

  const path = getPath(newLeaf);

  // 1️⃣ Read all blocks from path
  const [rows] = await pool.query(
    `SELECT * FROM data_blocks WHERE bucket_id IN (?)`,
    [path]
  );

  // 2️⃣ Move to stash
  stash.push(...rows);

  // 3️⃣ Add new block
  stash.push({
    block_id: key,
    block_value: encrypt(value),
    leaf_id: newLeaf,
    is_dummy: false,
  });


  // 4️⃣ Clear path in DB
  await pool.query(`DELETE FROM data_blocks WHERE bucket_id IN (?)`, [path]);

  // 5️⃣ Write back
  for (let bucket of path) {
    let bucketBlocks = [];

    for (let i = 0; i < stash.length; i++) {
      const block = stash[i];

      if (block.leaf_id && getPath(block.leaf_id).includes(bucket)) {
        bucketBlocks.push(block);
      }

      if (bucketBlocks.length >= BUCKET_SIZE) break;
    }

    // remove from stash
    stash = stash.filter((b) => !bucketBlocks.includes(b));

    // fill dummy
    while (bucketBlocks.length < BUCKET_SIZE) {
      bucketBlocks.push(generateDummyBlock(bucket));
    }

    // insert into DB
    for (let block of bucketBlocks) {
      await pool.query(
        `INSERT INTO data_blocks 
        (block_id, block_value, leaf_id, bucket_id, is_dummy)
        VALUES (?, ?, ?, ?, ?)`,
        [
          block.block_id,
          block.block_value,
          block.leaf_id,
          bucket,
          block.is_dummy,
        ]
      );
    }
  }
const pathStr = path.join(" -> ");

logWriteOperation(key, "PATH: " + pathStr);

return {
  logs: getLogs(),
  path
};
}

// ================= READ =================
async function readData(key) {
  let leaf = positionMap[key];

  if (!leaf) {
    return null;
  }

  const path = getPath(leaf);
  const pathStr = path.join(" -> ");

  // 1️⃣ Read path
const [rows] = await pool.query(
  `SELECT * FROM data_blocks WHERE bucket_id IN (${path.map(() => "?").join(",")})`,
  path
);

  stash.push(...rows);

  // 2️⃣ Find block
  const block = stash.find(
    (b) => b.block_id === key && !b.is_dummy
  );

  let result = null;

  if (block) {
    result = decrypt(block.block_value);

    // 🔄 assign new leaf
    positionMap[key] = getRandomLeaf();
    block.leaf_id = positionMap[key];
  }

  // 3️⃣ Clear path
  await pool.query(`DELETE FROM data_blocks WHERE bucket_id IN (?)`, [path]);

  // 4️⃣ Write back
  for (let bucket of path) {
    let bucketBlocks = [];

    for (let i = 0; i < stash.length; i++) {
      const b = stash[i];

      if (b.leaf_id && getPath(b.leaf_id).includes(bucket)) {
        bucketBlocks.push(b);
      }

      if (bucketBlocks.length >= BUCKET_SIZE) break;
    }

    stash = stash.filter((b) => !bucketBlocks.includes(b));

    while (bucketBlocks.length < BUCKET_SIZE) {
      bucketBlocks.push(generateDummyBlock(bucket));
    }

    for (let b of bucketBlocks) {
      await pool.query(
        `INSERT INTO data_blocks 
        (block_id, block_value, leaf_id, bucket_id, is_dummy)
        VALUES (?, ?, ?, ?, ?)`,
        [b.block_id, b.block_value, b.leaf_id, bucket, b.is_dummy]
      );
    }
  }

  logReadOperation(key, "PATH: " + pathStr, result);

 return {
  block_value: result || null,
  logs: getLogs(),
  path
};
}

module.exports = {
  writeData,
  readData,
};