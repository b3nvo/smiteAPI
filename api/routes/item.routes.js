const router = require('express').Router();
const controller = require('../controllers/item.controller');

router.get('/', controller.getItems);
router.get('/god/:id', controller.getItemsByGodId);

module.exports = router;