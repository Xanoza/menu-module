const { Client } = require('pg');
const config = require('./config.js');

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

module.exports = { getAll };
