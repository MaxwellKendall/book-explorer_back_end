const Test = require('../models');
const bodyParser = require('body-parser');
const router = require('express').Router();

module.exports = (app) => {
  app.use(bodyParser.json()); // assumes the requests are coming in JSON
  app.use(bodyParser.urlencoded({ extended: true })); // takes the data from the url and extends it...?

  app.get('/login', (req, res, next) => {
    res.render('login');
  });
}
  // app.post('/api/todo', function(req, res) {
    // things we can do:
      // 1. read items provided by request stream: req.body.etc..
      // 2. reference 'Test' Model and corresponding methods given by mongoose
              // i.e. findByIdAndUpdate
      // 3. Post new item to database:
            // use Test model as constructor:
                // i.e. const xyz = new Test({ blah: blah })
