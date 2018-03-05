const models = require('../db/models');
const bodyParser = require('body-parser');
const router = require('express').Router();
const jsonParser = bodyParser.json();
const queries = require('../queries');
const axios = require('axios');
const request = require('request');

const processAddBook = (book, user) => {
  return new Promise((resolve, reject) => {
    // check if book already exists for user
    const x = queries.checkIfBookExists({ book, user });
    const y = queries.checkLibrary({ book, user });
    const z = queries.addNewBook({ book, user });
    Promise.all([x, y, z])
      .then(res => {
        console.log('ProcessAddBook response: ', res);
        resolve(res);
      })
      .catch(err => {
        console.log('ProcessAddBook error: ', err);
        reject(err);
      });
  })
}

module.exports = (app) => {
  app.get('/api/search', (req, res) => {
    const { bookIndex, maxResults, searchTerm } = req.query;
    const root = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    axios({
      method: 'get',
      url: `${root}/&maxResults=${maxResults}&startIndex=${bookIndex}`,
      responseType: 'json',
    })
    .then((books) => {
      res.send(books.data);
    })
    .catch((err) => console.log('err', err));
  });

  app.post('/api/library', (req, res) => {
    const { book, user } = req.query;
    processAddBook(book, user)
      .then(response => res.send(response))
      .catch(err => console.log('error adding book: ', err))
  });

  app.delete('/api/library', (req, res) => {

  });
};
