var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://tuner:12344321@ds042417.mlab.com:42417/tunerrr';
// Use connect method to connect to the Server

var mongoose = require('mongoose');
var db = mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;
//console.log('databaseName: ', db..databaseName);
//console.log("Connected correctly to server");


export default db;