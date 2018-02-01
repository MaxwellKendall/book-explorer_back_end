// here any environment specific variables/db connection secrets are gonna live etc...
'use strict';
const secrets = require('./config');
const mysql = require('mysql');

const fbAuth = {
  clientID: '1901825850147397',
  clientSecret: '8f38d0ae5fa7a5876cdc3b801e996195',
  callbackURL: "http://localhost:8082/auth/facebook/callback"
};

const googAuth = {
  clientID: '813863696388-ba6tgtm7pe2tgvul9vkqimqb1gho2oue.apps.googleusercontent.com',
  clientSecret: 'zLQuvaPz-HdUaQWwWrp_C2XQ',
  callbackURL: 'http://localhost:8082/auth/google/callback/',
};

/*
  This is the connection information that will be used to run migrations and seeding.
  It should be altered with appropriate information for your needs.
  The module needs to export a configuration object that is accepted by knex, so any of the options available for knex can be set here.
  Since this is just a js file, you can also alter it to bring in config data from process.env or wherever is convenient for
  building the connection information
*/

const db = {
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

module.exports = {
  db,
  fbAuth,
  googAuth,
}
