const models = require('../db/models');
const bodyParser = require('body-parser');
const router = require('express').Router();
const jsonParser = bodyParser.json();
const queries = require('../queries');

module.exports = (app) => {
  app.use(bodyParser.json()); // assumes the requests are coming in JSON
  app.use(bodyParser.urlencoded({ extended: true })); // takes the data from the url and extends it...?

  app.get('/', (req, res) => {
    res.render('index');
    console.log('activeUSer: ', req.user);
  });

  app.get('/activeuser', (req, res) => {
    console.log(req.user);
    queries.findUserById(req.user)
      // .then(user => console.log(user));
      .then(user => res.send(JSON.stringify(user)));
  });
}
