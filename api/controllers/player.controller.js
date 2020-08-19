const Api = require("../api");
const c = require('../global');
const api = new Api();

exports.getPlayerId = (req, res, next) => {
    var username = req.params.username;

    api.searchplayer(username, (err, resp) => {
        if (err) console.log('error: cant find player');
        if (resp[0].ret_msg === 'Invalid session id.' || resp.ret_msg === 'Invalid session id.') {
            api.connect((err, resp) => {
                if (err) console.log('Error: no connection to api');
                config.sessionId = resp.session_id;
            })      
        } else {
            res.status(200).json(resp);
            req.player_id = resp[0].player_id;
            next();
        }
    });
}

exports.getHistory = (req, res) => {
    api.getMatchHistory(req.player_id, (err, resp) => {
        if (err) res.status(400).json({error: err.toString()});
        if (resp[0].ret_msg === 'Invalid session id.' || resp.ret_msg === 'Invalid session id.') {
            api.connect((err, resp) => {
                if (err) console.log('Error: no connection to api');
                config.sessionId = resp.session_id;
            })      
        } else {
            res.status(200).json(resp);
        }
    })
}

exports.getMatchDetails = (req, res) => {
    api.getMatchDetails(req.params.matchId, (err, resp) => {
        if (err) res.status(400).json({ error: err.toString() });
        if (resp[0].ret_msg === 'Invalid session id.' || resp.ret_msg === 'Invalid session id.') {
            api.connect((err, resp) => {
                if (err) console.log('Error: no connection to api');
                config.sessionId = resp.session_id;
            })      
        } else {
            res.status(200).json(resp);
        }
    })
}