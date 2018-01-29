// Here we define and export the different schemas of the db
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  profileId: String,
  fullName: String,
  profilePic: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;
