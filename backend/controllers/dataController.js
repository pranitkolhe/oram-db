const oramService = require("../services/oramService");

async function write(req, res) {
  const { key, value } = req.body;

  const data =  await oramService.writeData(key, value);

  res.json({ message: "Stored using Path ORAM" , logs:data.logs, path:data.path});
}

async function read(req, res) {
  const { key } = req.params;

  const data = await oramService.readData(key);

  res.json(data);
}

module.exports = {
  write,
  read,
};