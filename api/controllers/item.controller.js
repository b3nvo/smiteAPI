const Api = require("../api");
const c = require('../global');
const api = new Api();

exports.getItems = (req, res) => {
    api.getItems((err, resp) => {
        if (err) res.status(400).json({error: err.toString() });
        res.status(200).json(resp);
    })
}