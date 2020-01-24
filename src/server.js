const express       = require("express");
const app           = express();
const http          = require("http");
const db            = require('../lib/db');
const cfg           = require('../config');

// Link routes folder
require('./routes')(app);

// Connect to MySQL
db.authenticate()
    .then(() => {
        console.log('DATABASE Connection successfully established.');
    })
    .catch(err => {
        console.log('Unable to connect to the DATABASE:', err);
    })


// Create Webserver
http.createServer(app).listen(
    cfg.port, () => { console.log(`Express Server running on ${cfg.port}...`)}
    );