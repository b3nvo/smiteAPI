const router = require('express').Router();
const controller = require('../controllers/god.controller');

router.get('/', controller.getGods);

module.exports = router;