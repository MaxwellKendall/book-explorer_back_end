// here any environment specific variables/db connection secrets are gonna live etc...
'use strict';

const secrets = require('./config');
const mysql = require('mysql');

const googAuth = {
  clientID: secrets.google.clientID,
  clientSecret: secrets.google.clientSecret,
  callbackURL: 'http://localhost:8082/auth/google/callback/',
  passReqToCallback: true,
};

const goodReadsAuth = {
  consumerKey: secrets.goodReads.consumerKey,
  consumerSecret: secrets.goodReads.consumerSecret,
  callbackURL: 'http://localhost:8082/auth/goodreads/callback',
  passReqToCallback: true,
}

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
  secrets,
  // fbAuth,
  googAuth,
  goodReadsAuth,
}
