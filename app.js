const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const passport = require('passport');
const knex = require('knex');

const config = require('./config');

// Auth
const processAuth = require('./auth');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoodReadsStrategy = require('passport-goodreads');

// Defining apis
const mainController = require('./controllers/mainController');
const loginController = require('./controllers/loginController');

// Initiating app
const app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// connecting to dB
const db = knex(config.db);

// setting middleware
app.use('/public', express.static(__dirname + '/public'));
app.use(session({ secret: 'SQRLE', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy(config.fbAuth, processAuth));
passport.use(new GoogleStrategy(config.googAuth, processAuth));
passport.use(new GoodReadsStrategy(config.goodReadsAuth, processAuth));

// initiating apis
loginController(app);
mainController(app);

app.listen(port);