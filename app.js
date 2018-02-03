const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const passport = require('passport');
const knex = require('knex');

const config = require('./config');

// Auth
const auth = require('./auth');
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Defining apis
const mainController = require('./controllers/mainController');
const loginController = require('./controllers/loginController');

// Initiating app
const app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// connecting to dB
const db = knex(config.db);
// const query = db.select().from('User').then(result => console.log(result));
// console.log('config.db', query.toString());

// setting middleware
app.use('/public', express.static(__dirname + '/public'));
app.use(session({ secret: 'SQRLE', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy(config.fbAuth, auth.processFbAuth));
passport.use(new GoogleStrategy(config.googAuth, auth.processGoogAuth));

// initiating apis
loginController(app);
mainController(app);

app.listen(port);