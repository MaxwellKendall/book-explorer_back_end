const secrets = require('./config');

module.exports = {
    client: 'mysql',
    connection: {
        host: `${secrets.host}`,
        user: `${secrets.uname}`,
        password: `${secrets.pwd}`,
        database: `${secrets.db}`
    },
    pool: {
        min: 2,
        max: 10
    }
};