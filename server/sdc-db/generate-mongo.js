const makeMenu = require('./generatorStore.js').makeMenu;
const Writable = require('stream').Writable;
const Readable = require('stream').Readable;
const writeStream = new Writable({
  objectMode: true
});
const readStream = new Readable({
  objectMode: true
});
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const streamData = function() {
  const connect = MongoClient.connect(url);
  const start = new Date();
  const qty = 100;
  const multiplier = 1;
  let index = 0;

  readStream._read = function() {
    if (index % (multiplier / 100) === 0) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Processing ${(index / multiplier).toFixed(2)
      }%, elapsed ${((new Date() - start) / 6000).toFixed(2)} minutes`);
    }

    let restaurantMenu = makeMenu(index, true);
    readStream.push(restaurantMenu);

    if (index === 100 * multiplier) {
      readStream.push(null);
    }
    index++;
  };

  writeStream._write = function (chunk, encoding, done) {
    connect.then(function(client) {
      const db = client.db('res').collection('mens');
      db.insertMany(chunk).then(() =>{
        done();
      });
    });
  };

  readStream.pipe(writeStream);

  writeStream.on('finish',
    function handleFinish() {
      connect.then(function(client) {
        client.close();
      });
      console.log('CSVStream serialization complete! in ', (( new Date() - start) / 6000).toFixed(1), 'minutes');
    }
  );
};

streamData();
