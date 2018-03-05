const config = require('../config'); // add config for auth
const db = require('knex')(config.db);

const findUserById = (id) => {
  return db.select()
    .from('Users')
      .where('id', id);
};

const checkIfBookExists = (book, user) => {
  return db.select('id')
    .from('Books')
    .where('id', id);
};

const addToLibrary = (book, user) => {
  return db('Library')
    .insert({id: `${user.lib_id}`, book_id: `${book.id}`});
};

const addNewBook = (book, user) => {
  return db('Book')
    .insert({ id: `${book.id}`, title: `${book.title}`, author: `${book.author}` });
};

module.exports = {
  findUserById,
  addNewBook,
  addToLibrary,
  checkIfBookExists,
}
