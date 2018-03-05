const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const knex = require('knex');
const cors = require('cors');

// Auth
const flash = require('connect-flash');
const { processOAuth, processLocalAuth, processRegistration }  = require('./auth');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoodReadsStrategy = require('passport-goodreads');
const LocalStrategy = require('passport-local').Strategy;

// Defining apis
const mainController = require('./controllers/mainController');
const loginController = require('./controllers/loginController');
const bookController = require('./controllers/bookController');

// config
const config = require('./config');

// Initiating app
const app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// connecting to dB
const db = knex(config.db);

// setting middleware
app.use('/public', express.static(__dirname + '/public'));
app.use(session({ secret: 'SQRLE', resave: false, saveUninitialized: true }));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(processLocalAuth));
passport.use(new GoogleStrategy(config.googAuth, processOAuth));
passport.use(new GoodReadsStrategy(config.goodReadsAuth, processOAuth));

// initiating apis
loginController(app);
mainController(app);
bookController(app);

app.listen(port);