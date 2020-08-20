const moment = require('moment');
const axios = require('axios');
const md5 = require('md5');
var c = require('./global');
require('dotenv').config();

module.exports = class API { 
    constructor(devId, authKey) {
        this.devId = process.env.devId;
        this.authKey = process.env.authKey;
        this.format = "Json";
        this.lang = "1";
    }

    connect(send) {
        var url = 
        c.constants.PC +
        "/" + "createsession" + 
        this.format + "/" +
        this.devId + "/" +
        this.getSignature("createsession") + "/" +
        this.timestamp();

        this.makeRequest(url, (err, data) => {
            if (err) send(err, null);
            send(null, data);
        });
    }

    test(send) {
        var url = c.constants.PC + "/pingJson";
        this.makeRequest(url, (err, data) => {
            if (err) send(err, null);
            send(null, data);
        })
    }

    searchplayer(player, send) { 
        var method = "getplayeridbyname";
        var url = this.urlBuilder(method, player);
        console.log(url);
        this.makeRequest(url, (err, data) => {
            console.log('player', data);
            if (err) send(err, null); 
            send(null, data);
        });
    }

    getPatchInfo(send) {
        var method = "getpatchinfo";
        var url = this.urlBuilder(method);
        this.makeRequest(url, (err, resp) => {
            if (err) send(err, null);
            send(null, resp);
        })
    }

    getMatchHistory(id, send) {
        var method = "getmatchhistory";
        var url = this.urlBuilder(method, id);
        this.makeRequest(url, (err, resp) => {
            if (err) send(err, null);
            send(null, resp);
        })
    }

    getItemsByGodId(id, send) {
        var method = "getgodrecommendeditems";

        var url = this.urlBuilder(method, id, 1);
        this.makeRequest(url, (err, resp) => {
            if (err) send(err, null);
            send(null, resp);
        });
    }

    getMatchDetails(id, send) {
        var method = "getmatchdetails";
        var url = this.urlBuilder(method, id);
        this.makeRequest(url, (err, resp) => {
            if (err) send(err, null);
            send(null, resp);
        })
    }

    getGods(send) {
        var method = "getgods";
        var url = this.urlBuilder(method, this.lang);
        this.makeRequest(url, (err, resp) => {
            if (err) send(err, null);
            send(null, resp);
        })
    }

    getItems(send) {
        var method = "getitems";
        var url = this.urlBuilder(method, this.lang);
        this.makeRequest(url, (err, resp) => {
            if (err) send(err, null);
            send(null, resp);
        })
    }

    makeRequest(url, send) {
        axios.get(url)
        .then((resp) => {
            send(null, resp.data);
        })
        .catch((err) => {
            send(err, null)
        })
    }

    urlBuilder(method, player, lang, match_id, champ_id, queue, tier, season) {
        var baseURL = 
        c.constants.PC + "/" + 
        method + this.format + 
        "/" + this.devId + 
        "/" + this.getSignature(method) +
        "/" + c.config.sessionId + "/" +
        this.timestamp();

        player ? (baseURL += "/" + player) : null;
        champ_id ? (baseURL += "/" + champ_id) : null;
        lang ? (baseURL += "/" + lang) : null;
        match_id ? (baseURL += "/" + match_id) : null;
        queue ? (baseURL += "/" + queue) : null;
        tier ? (baseURL += "/" + tier) : null;
        season ? (baseURL += "/" + season) : null;

        return baseURL;
    }

    timestamp() {
        return moment()
        .utc()
        .format("YYYYMMDDHHmmss");
    }

    getSignature(method) {
        return md5(this.devId + method + this.authKey + this.timestamp())
    }
}