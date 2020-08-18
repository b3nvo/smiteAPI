const router = require('express').Router();
const controller = require('../controllers/player.controller');

router.get('/history/:username', controller.getPlayerId, controller.getHistory);
router.get('/match/:matchId', controller.getMatchDetails);

module.exports = router;