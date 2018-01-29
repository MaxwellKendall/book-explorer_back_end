// Here we define and export the different schemas of the db
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var testSchema = new Schema({
    username: String,
    msg: String,
});

var Test = mongoose.model('Test', testSchema);

module.exports = Test;
