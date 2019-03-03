const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'restaurants';
const tbName = 'menus';

const findAllMenusForId = function(id, callback) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    console.log('Connected to Mongo');
    const db = client.db(dbName).collection(tbName);
    db.find({res_id: id}).toArray(function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      callback(null, formatData(data));
      client.close();
    });
  });
};

const formatData = (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    let {_id, ... formatted} = data[i];
    result.push(formatted);
  }
  return result;
};

module.exports = {
  findAllMenusForId
};
