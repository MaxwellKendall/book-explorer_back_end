const bodyParser = require('body-parser');
const router = require('express').Router();
const passport = require('passport');
const { processRegistration } = require('../auth');
var jsonParser = bodyParser.json();

module.exports = (app) => {
  app.use(bodyParser.json()); // assumes the requests are coming in JSON
  app.use(bodyParser.urlencoded({ extended: true })); // takes the data from the url and extends it...?
  
  // Login / Logout
  app.get('/login', (req, res, next) => { res.render('login'); });
  app.get('/logout', (req, res) => { req.logout(); res.redirect('/login'); });

  // Google
  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })); // add scope
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true  }),
  (req, res) => {
    res.redirect('/');
  });

  // GoodReads
  app.get('/auth/goodreads', passport.authenticate('goodreads'));
  app.get('/auth/goodreads/callback', passport.authenticate('goodreads',{ failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/');
  });

  // Local Auth
  // app.post('/auth/register', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }))
  app.post('/auth/register', jsonParser, (req, res, next) => {
    console.log('REQ.BODY: ', req.body);
    const { username, password } = req.body;
    processRegistration(username, password)
      .then(user => {
        console.log('response from process registration: ', user);
        setTimeout(() => {
          res.send(JSON.stringify({ user }));
        }, 1000)
      })
      .catch(err => console.log('PROCESS REGISTRATION ERROR: ', err))
  });
  app.post('/auth/local', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));
}