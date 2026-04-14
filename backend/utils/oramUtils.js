const { v4: uuidv4 } = require("uuid");

const TREE_HEIGHT = 3;
const BUCKET_SIZE = 4;
const TOTAL_NODES = Math.pow(2, TREE_HEIGHT) - 1;
const LEAF_START = Math.pow(2, TREE_HEIGHT - 1);

// 🎯 Random leaf
function getRandomLeaf() {
  return Math.floor(Math.random() * LEAF_START) + LEAF_START;
}

// 🌳 Get path from leaf → root
function getPath(leaf) {
  const path = [];
  while (leaf >= 1) {
    path.push(leaf);
    leaf = Math.floor(leaf / 2);
  }
  return path;
}

// 🧱 Dummy block
function generateDummyBlock(bucket_id) {
  return {
    block_id: "dummy_" + uuidv4(),
    block_value: "DUMMY",
    leaf_id: getRandomLeaf(),
    bucket_id,
    is_dummy: true,
  };
}

// 🔀 Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

module.exports = {
  getRandomLeaf,
  getPath,
  generateDummyBlock,
  shuffle,
  BUCKET_SIZE,
};