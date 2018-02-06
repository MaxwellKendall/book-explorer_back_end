'use strict';

const passport = require('passport');
const config = require('../config'); // add config for auth
const db = require('knex')(config.db);

// DB Update Statements
const providerSpecificUpdate = (id, profileId, provider) => {
  if (provider === 'google') {
    return db('Users')
      .where('id', id)
        .update({ 'google': `${profileId}`});
  } else {
    return db('Users')
      .where('id', id)
        .update({ 'goodreads': `${profileId}`});
  }
};

const createNewUser = profile => {
  if (profile.provider === 'google') {
    return db('Users')
    .insert({ name: `${profile.displayName}`, google: `${profile.id}`, photoUrl: `${profile._json.image.url}` });
  } else if (profile.provider === 'goodreads') {
    return db('Users')
    .insert({ name: `${profile.displayName}`, goodreads: `${profile.id}` });
  }
};

// DB Queries
const findByProviderId = (provider, providerId) => {
  return db.select('id')
    .from('Users')
      .where(provider, providerId);
};

const findByUserId = (id) => {
  console.log('findByUserId id === ', id);
  return db.select('id')
    .from('Users')
      .where('id', id);
};

const grAuth = (done, profile) => {
  passport.serializeUser((user, done) => {
    console.log('user from serializeUser on grAuth: ', user);
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    console.log('id from deserailizeUser:', id); // { id: 5 }
    findByUserId(id)
      .then(result => {
        done(null, result[0]);
      })
      .catch(error => console.log(`error on findById: ${error}`));
  });
  findByProviderId(profile.provider, profile.id)
    .then(result => {
      if (result.length !== 0) {
        done(null, result[0]);
      } else {
        createNewUser(profile)
          .then(newUser => {
            console.log(newUser);
            done(null, newUser[0]);
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}

const googAuth = (done, profile) => {
  passport.serializeUser((user, done) => {
    console.log('user from serializeUser on googAuth: ', user);
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    console.log('id from deserailizeUser on googAuth:', id); // { id: 5 }
    findByUserId(id)
      .then(result => {
        done(null, result[0]);
      })
      .catch(error => console.log(`error on findById on googAuth: ${error}`));
  });
  findByProviderId(profile.provider, profile.id)
    .then(result => {
      if (result.length !== 0) {
        done(null, result[0]);
      } else {
        createNewUser(profile)
          .then(newUser => {
            console.log('newUser from googAuth', newUser);
            done(null, newUser[0]);
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}

const processAuth = (req, token, tokenSecret, profile, done) => {
  const provider = profile.provider;
  if (!req.user && profile.provider === 'google') {
    googAuth(done, profile);
  } else if (!req.user && profile.provider === 'goodreads') {
    grAuth(done, profile);
  } else {
      providerSpecificUpdate(req.user.id, profile.id, provider)
        .then(res => done(null, req.user))
        .catch(err => console.log(err));
    }
  }

module.exports = processAuth;
