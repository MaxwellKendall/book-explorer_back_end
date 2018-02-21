const config = require('../config'); // add config for auth
const db = require('knex')(config.db);

const findUserById = (id) => {
  return db.select()
    .from('Users')
      .where('id', id);
};

module.exports = {
  findUserById,
}