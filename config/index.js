// here any environment specific variables/db connection secrets are gonna live etc...
const secrets = require('./config');

const getDbConnectionString = () => {
  return `mongodb://${secrets.uname}:${secrets.pwd}@ds215388.mlab.com:15388/bookexplorer`;
};

const fbAuth = {
  clientID: '1901825850147397',
  clientSecret: '8f38d0ae5fa7a5876cdc3b801e996195',
  callbackURL: "http://localhost:8082/auth/facebook/callback"
};

const googAuth = {
  clientID: '813863696388-ba6tgtm7pe2tgvul9vkqimqb1gho2oue.apps.googleusercontent.com',
  clientSecret: 'zLQuvaPz-HdUaQWwWrp_C2XQ',
  callbackURL: 'http://localhost:8082/auth/google/callback/',
};

module.exports = {
  getDbConnectionString,
  fbAuth,
  googAuth,
}
