const router = require("express").Router();
const godRoutes = require('./god.routes');
const itemRoutes = require('./item.routes');
const playerRoutes = require('./player.routes');
const Api = require('../api');
const global = require('../global');
const api = new Api();

router.get('/test', (req, res) => api.test((err, resp) => {
    if (err) res.status(400).json({error: err.toString()});
    res.status(200).json(resp);
}));

router.get(
     '/patch',
     (req, res) => {
         api.getPatchInfo((err, resp) => {
             if (err) res.status(400).json({err: err.toString() });
             res.status(200).json(resp);
         });
     }
)
router.use('/god', godRoutes);
router.use('/item', itemRoutes);
router.use('/player', playerRoutes);

module.exports = router;