const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const dbName = 'fetcher';


const findDocuments = function(db, callback) {
  const collection = db.collection('repos');
  collection.find({}).limit(2).toArray(function(err, docs) {
    if (err) {
      console.log('CONNECT ERROR: ', err);
      return;
    }
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log('CONNECT ERROR: ', err);
    return;
  }
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  findDocuments(db, function() {
      client.close();
    });
});
