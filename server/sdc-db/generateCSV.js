const fileSystem = require('fs');
const csvWriter = require('csv-write-stream');
const makeMenu = require('./generatorStore.js').makeMenu;
const Readable = require('stream').Readable;
const readStream = new Readable({
  objectMode: true
});
const headers = ['res_id', 'type', 'category', 'name', 'description', 'price'];

const streamData = function() {
  const writer = csvWriter({headers: headers});
  const outputStream = fileSystem.createWriteStream(__dirname + '/test-data.csv');

  const start = new Date();
  const qty = 100;
  const multiplier = 1;
  let index = 0;

  readStream._read = function() {
    if (index % multiplier === 0) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Processing ${index / multiplier
      }%, elapsed ${((new Date() - start) / (1000 * 60)).toFixed(2)} minutes`);
    }

    let restaurantMenu = makeMenu(index);

    for (let i = 0; i < restaurantMenu.length; i++) {
      readStream.push(restaurantMenu[i]);
    }
    if (index === 100 * multiplier) {
      readStream.push(null);
    }
    index++;
  };

  readStream.pipe(writer).pipe(outputStream);
  outputStream.on(
    'finish',
    function handleFinish() {
      console.log('CSVStream serialization complete! in ', (( new Date() - start) / (1000 * 60)).toFixed(1), 'minutes');
    }
  );
};

streamData();
