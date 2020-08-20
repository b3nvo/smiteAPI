const Api = require("../api");
const c = require('../global');
const api = new Api();

exports.getGods = (req, res) => {
    api.getGods((err, resp) => {
        if (err) res.status(400).json({error: err.toString() });
        if (resp[0].ret_msg === 'Invalid session id.' || resp.ret_msg === 'Invalid session id.') {
            api.connect((err, resp) => {
                if (err) console.log('Error: no connection to api');
                c.sessionId = resp.session_id;
            })      
        } else {
            let result = [];
            for(let i = 0; i < resp.length; i++) {
                result.push({Name: resp[i].Name, id: resp[i].id, godIcon_URL: resp[i].godIcon_URL});
            }
            res.status(200).json(result);
        }
        
    })
}