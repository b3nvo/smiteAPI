const router = require('express').Router();
const controller = require('../controllers/player.controller');

router.get('/history/:username', controller.getPlayerId, controller.getHistory);

module.exports = router;