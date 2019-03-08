const dbName = 'restaurants';
const tbName = 'menus';

const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: dbName,
    password: 'password',
    port: 5432,
    max: 50,
    min: 5
  });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


const findAllMenusForId = (id, callback) => {
  pool.connect()
    .then(client => {
      return client.query(`SELECT res_id, type, category, description, price FROM ${tbName} WHERE res_id=${id}`)
        .then(res => {
          client.release();
          callback(null, res.rows);
        })
        .catch(e => {
          client.release()
          console.log(err.stack);
          callback(e);
        });
    });
};

module.exports = {
  findAllMenusForId
};
