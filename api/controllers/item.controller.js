const Api = require("../api");
const c = require('../global');
const api = new Api(c.config.devId, c.config.authKey);

exports.getItems = (req, res) => {
    api.getItems((err, resp) => {
        if (err) res.status(400).json({error: err.toString() });
        res.status(200).json(resp);
    })
}