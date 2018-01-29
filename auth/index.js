'use strict';

const passport = require('passport');
const config = require('../config'); // add config for auth
const models = require('../models');

const findById = id => {
  return new Promise((resolve, reject) => {
    models.User.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

const createNewUser = profile => {
  return new Promise((resolve, reject) => {
    const newUser = new models.User({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: '',
    });

    newUser.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(newUser);
      }
    })
  });
};

const findOne = profileId => {
  return models.User.findOne({ 'profileId': profileId });
};

const processAuth = (accessToken, refreshToken, profile, done) => {
  // 1. Store id in req.session as browser cookie
  console.log('process auth fired!');
  passport.serializeUser((user, done) => {
    done(null, user.id); // makes available in req.user
  });
// 2. Take browser cookie and retrieve corresponding data from session store
  passport.deserializeUser((id, done) => {
    findById(id)
      .then(user => done(null, user))
      .catch(error => console.log(`error on findById: ${error}`));
  });
// 3. take the profile ID and query the db
  findOne(profile.id)
    .then(result => {
      if (result) {
        // a. if a profile already exists, this is a returning user
        done(null, result);
      } else {
        // b. if it doesnt, new user, create new profile
        createNewUser(profile)
          .then(newUser => done(null, newUser))
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}

module.exports = processAuth;
