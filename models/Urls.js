const Sequelize         = require('sequelize');
const db                = require('../lib/db');

// Create Stored Urls model
const Urls = db.define('urls', {
    // Attributes
    longUrl: {
    type: Sequelize.STRING
    },
    hashedUrl: {
        type: Sequelize.STRING
    }
});

/* Can Run Syncs Here */
// Urls.sync({ force: true }).then(() => {
//     return Urls.create({
//         longUrl: 'Dbsync',
//         hashedUrl: 'Dbsync'
//     });
// });

module.exports = Urls;