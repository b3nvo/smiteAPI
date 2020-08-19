const express = require("express");
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./api/routes/routes');
const api = require('./api/api');
const { config } = require("./api/global");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => { console.log('server is running on port ' + port)});

// enable session id
const access = new api();
access.connect((err, resp) => {
    if (err) console.log('Error: no connection to api');
    config.sessionId = resp.session_id;
})

app.use('/api', routes);
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found'});
})

module.exports = app;