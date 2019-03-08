const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'restaurants';
const tbName = 'menus';
var db;

MongoClient.connect(url, {useNewUrlParser: true, poolSize: 50}, async function(err, database) {
  if(err) throw err;
  db = await database.db(dbName).collection(tbName);
});

const findAllMenusForId = function(id, callback) {
  db.find({res_id: id}).toArray(function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, formatData(data));
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
