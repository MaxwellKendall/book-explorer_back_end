'use strict';

const passport = require('passport');
const config = require('../config'); // add config for auth
const db = require('knex')(config.db);

// DB Queries
  const findById = id => {
    return db.select('uid')
      .from('Users').where('uid', id);
  }

  const createNewUser = profile => {
    return db('Users')
      .insert({ name: `${profile.displayName}`, uid: `${profile.id}` });
  };

  const findOne = profileId => {
    return db.select('uid')
      .from('Users')
        .where('uid', profileId);
  }

const processAuth = (accessToken, refreshToken, profile, done) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    findById(id)
      .then(result => {
        done(null, result[0]);
      })
      .catch(error => console.log(`error on findById: ${error}`));
  });

  findOne(profile.id)
    .then(result => {
      if (result.length !== 0) {
        // done(null, result[0].uid);
        done(null, profile);
      } else {
        createNewUser(profile)
          .then(newUser => done(null, profile))
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

module.exports = processAuth;
