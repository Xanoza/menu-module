const {Client} = require('pg');
// const config = require('./config.js');
const dbName = 'restaurants';
const tbName = 'menus';

const findAllMenusForId = async (id, callback) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: dbName,
    password: 'password',
    port: 5432
  });
  client.connect()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => {
      console.error('MY connection error', err.stack);
      return console.log(err);
    });
  const res = await client.query(`SELECT res_id, type, category, description, price FROM ${tbName} WHERE res_id=${id}`)
    .catch(err => console.log('----------', err));
  client.end();
  callback(null, res.rows);
};

module.exports = {
  findAllMenusForId
};
