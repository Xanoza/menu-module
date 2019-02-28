const { Client } = require('pg');
const config = require('./config.js');
// const client = new Client(config);

// client.connect();
console.log(config)

const client = new Client(config)
client.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('MY connection error', err.stack))

const getAll = async () => {
  const res = await client.query('SELECT * FROM test');
  client.end();
  console.log(res.rows);
};

getAll();



// client.query('SELECT * FROM test', async(err, res) => {
//   if (err) {
//     console.log('PRINTING ERROR', err);
//     return;
//   }
//   console.log(err, res)
//   client.end()
// });

module.exports = { getAll };
