const express = require("express");
const router = express.Router();
const { getLogs } = require("../utils/logger");

router.get("/", (req, res) => {
    res.json(getLogs());
});

module.exports = router;