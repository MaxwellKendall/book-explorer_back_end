'use strict';

const passport = require('passport');
const config = require('../config'); // add config for auth
const db = require('knex')(config.db);

// DB Insert/Update Statements
  // 1.
  const createNewUser = profile => {
    if (profile.provider === 'google') {
      return db('Users')
      .insert({ name: `${profile.displayName}`, google: `${profile.id}`, photoUrl: `${profile._json.image.url}` });
    } else if (profile.provider === 'goodreads') {
      return db('Users')
      .insert({ name: `${profile.displayName}`, goodreads: `${profile.id}` });
    } else if (profile.provider === 'local') {
      return db('Users')
      .insert({ username: `${profile.username}`, password: `${profile.password}` });
    }
  }; 

  // 2.
  const providerSpecificUpdate = (id, profile) => {
    if (profile.provider === 'google') {
      return db('Users')
        .where('id', id)
          .update({ 'google': `${profile.id}`, 'photoUrl': `${profile._json.image.url}` });
    } else {
      return db('Users')
        .where('id', id)
          .update({ 'goodreads': `${profile.id}`});
    }
  };

// DB Select Statements
  // 1. 
  const findIdByProviderId = (provider, providerId) => {
    return db.select('id')
      .from('Users')
        .where(provider, providerId);
  };
  // 2. 
  const checkCredentials = (username, password = null) => {
    if (password !== null) {
      return db.select('id')
      .from('Users')
      .where({'password': password, 'username': username });
    } else if (password === null) {
      return db.select('id')
      .from('Users')
      .where({'username': username });
    }
  }

// Processing logic

  // 1.
  const processOAuth = (req, token, tokenSecret, profile, done) => {
    const provider = profile.provider;
    if (!req.user) {
      // req.user is defined if user is logged in.
      passport.serializeUser((user, done) => {
        // update the req object on user property with userid
        done(null, user);
      });
      // 
      passport.deserializeUser((id, done) => {
        // take whats on the stream and convert to an object...? Used to check DB prior to doing this for some reason...?
        done(null, id);
      });
      findIdByProviderId(profile.provider, profile.id)
      // based on provider (google or good reads) check to see if user exists yet
        .then(result => {
          if (result.length !== 0) {
            done(null, result[0].id);
          } else {
            createNewUser(profile)
              .then(newUser => {
                done(null, newUser[0]);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    } else {
      // handles case when user is logged in but authroization is occurring because they're connecting their accounts
      console.log('right before providerSpecific Update: ', req.user);
        providerSpecificUpdate(req.user, profile)
          .then(res => {
            console.log(`response from providerSpecific Update: ${res}`);
            done(null, req.user);
          })
          .catch(err => console.log(err));
      }
  };

  // 2.
  const processLocalAuth = (username, password, done) => {
    checkCredentials(username, password)
      .then(res => {
        passport.serializeUser((user, done) => {
          done(null, user);
        });
        passport.deserializeUser((id, done) => {
          done(null, id);
        });
        done(null, res[0].id);
      })
      .catch(err => console.log('Local Login failed. checkSignIn Error: ', err));
  };

  // 3.
  const processRegistration = (username, password) => {
    // validate password in front end; using string.prototype.match(regexpression in string form);
   return new Promise((resolve, reject) => {
    checkCredentials(username)
      .then(resp1 => {
        if (resp1.length === 0) {
          createNewUser({ username, password, provider: 'local' })
            .then(resp2 => {
              resolve({ id: resp2[0], username, password });
            });
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        console.log('ERROR ProcessRegistration(): ', err);
        resolve(false);
      });
   })
  };

module.exports = {
  processOAuth,
  processLocalAuth,
  processRegistration,
}
