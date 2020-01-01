const dotenv = require('dotenv');

// Initiate dotenv 
dotenv.config();

// Set up config parameters
const config = {
    // Defaults
    version: '1.0',
    app: 'Auth API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3030,
    ip: process.env.IP || '0.0.0.0',
    salt: process.env.SALT_KEY || 123456,

    // CORS and Headers
    origins: '*',
    headers: 'Origin, X-Requested-With, Content-Type, Accept',

    // Email
    email: {
        fromName: 'NoReply',
        fromEmail: 'noreply@example.com'
    }

};

module.exports = config;