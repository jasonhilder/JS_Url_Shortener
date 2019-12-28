const express       = require('express');
const shortenUrl    = require('./ShortenUrl');
const redirectUrl   = require('./RedirectUrl');
const date         = new Date().toISOString().slice(0, 10);

module.exports = (app) => {
    
    // Home Route served from a static folder
    app.get('/', (req, res) => {
        res.status(200).send({
            version: 1.0,
            time: date,
            description: 'A Url shortener similar to sites like bitly.'
        })
    })

    app.use(express.json());
    
    // Middleware routes
    app.use('/api/', shortenUrl);
    app.use('/r/', redirectUrl);

    // API endpoints for posting a url to the db
    app.get('/test', (req, res) => {
        res.json([{
            id: 1,
            username: "samsepi0l"
        }, {
            id: 2,
            username: "D0loresH4ze"
        }]);      
    })
}