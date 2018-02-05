const bodyParser = require('body-parser');
const router = require('express').Router();
const passport = require('passport');

module.exports = (app) => {
  app.use(bodyParser.json()); // assumes the requests are coming in JSON
  app.use(bodyParser.urlencoded({ extended: true })); // takes the data from the url and extends it...?

  app.get('/login', (req, res, next) => {
    res.render('login');
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })); // add scope
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

  app.get('/auth/goodreads', passport.authenticate('goodreads'));
  app.get('/auth/goodreads/callback', passport.authenticate('goodreads',{ failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
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
