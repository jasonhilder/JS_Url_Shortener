const Sequelize = require('sequelize');

// Connection details
const db = new Sequelize('url_shorter', 'root', 'HelloWorld', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});



module.exports = db;