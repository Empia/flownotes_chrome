var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://noterrr:12344321@ds255455.mlab.com:55455/noterrr';
// Use connect method to connect to the Server
var db = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('databaseName: ', db.s.databaseName);
  console.log("Connected correctly to server");

  return db;
});

export default db;