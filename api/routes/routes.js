const router = require("express").Router();
const godRoutes = require('./god.routes');
const itemRoutes = require('./item.routes');
const playerRoutes = require('./player.routes');
const Api = require('../api');
const global = require('../global');
const api = new Api(global.config.devId, global.config.authKey);

router.get('/test', (req, res) => api.test());
router.use('/god', godRoutes);
router.use('/item', itemRoutes);
router.use('/player', playerRoutes);

module.exports = router;