'use strict';

/* See: http://knexjs.org/#Schema-Building
for documentation of the schema building api in use */

// rhinozug should have been installed when the migration folder was initialized
let rz = require('rhinozug');
let config = require('../config/default');
const knex = require('knex');

module.exports = {
    up: () => {
        // rz.getConnection();
        let connection = knex(config);
        // Add altering commands here.
        // Return a promise to correctly handle asynchronicity.

        // Example that creates two tables with a fk between them:
        return connection.schema.createTableIfNotExists('Users', (table) => {
            table.increments('id');
            table.string('name');
            table.string('address1');
            table.string('uid');
        }).catch((err) => {
            console.error(err);
        // because knex objects return bluebird promises, we can use .finally here
        }).finally(() => {
            // always destory the connection when you are done, regardless of outcome
            connection.destroy();
        });
    },

    down: function () {
        let connection = rz.getConnection(config);
        // Add reverting commands here.
        // Return a promise to correctly handle asynchronicity.

        // Example that undoes the commands above:
        return connection.schema.dropTable('Users')
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                // always destroy the connection when you are done, regardless of outcome
                connection.destroy();
            });
    }
};
