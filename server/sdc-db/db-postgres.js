const {Client} = require('pg');
// const config = require('./config.js');
const dbName = 'restaurants';
const tbName = 'menus';
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: dbName,
  password: 'password',
  port: 5432
});

const findAllMenusForId = async (id, callback) => {
  client.connect()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => {
      console.error('MY connection error', err.stack);
      return console.log(err);
    });
  const res = await client.query(`SELECT res_id, type, category, description, price FROM ${tbName} WHERE res_id=${id}`);
  client.end();
  callback(null, res.rows);
};

module.exports = {
  findAllMenusForId
};
