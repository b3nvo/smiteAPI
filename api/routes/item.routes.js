const router = require('express').Router();
const controller = require('../controllers/item.controller');

router.get('/', controller.getItems);

module.exports = router;