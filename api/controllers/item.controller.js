const Api = require("../api");
const c = require('../global');
const api = new Api();

exports.getItems = (req, res) => {
    api.getItems((err, resp) => {
        if (err) res.status(400).json({error: err.toString() });
        if (resp[0].ret_msg === 'Invalid session id.' || resp.ret_msg === 'Invalid session id.') {
            api.connect((err, resp) => {
                if (err) console.log('Error: no connection to api');
                c.sessionId = resp.session_id;
            })      
        } else {
            res.status(200).json(resp);
        }
    });
}

exports.getItemsByGodId = (req, res) => {
    api.getItemsByGodId(req.params.id, (err, resp) => {
        if (err) res.status(400).json({ error: err.toString() });
        if (resp[0].ret_msg === 'Invalid session id.' || resp.ret_msg === 'Invalid session id.') {
            api.connect((err, resp) => {
                if (err) console.log('Error: no connection to api');
                c.sessionId = resp.session_id;
            })      
        } else {
            res.status(200).json(resp);
        }
    })
}