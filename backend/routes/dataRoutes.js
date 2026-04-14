const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataController');

router.post('/write', controller.write);
router.get('/read/:key', controller.read);

module.exports = router;