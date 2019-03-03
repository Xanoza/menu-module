const express = require('express');
const cors = require('cors');
const path = require('path');
const dbMongo = require("./sdc-db/db-mongo.js");
const dbPostgres = require("./sdc-db/db-postgres.js");

const server = express();
server.use(cors());
server.use(express.static(path.join(__dirname, '../client/dist')));

server.get("/mongo/:id", function (req, res) {
  const id = parseInt(req.params.id);
  dbMongo.findAllMenusForId(id, function (err, data) {
    if (err) {
      console.log("error message: ", err);
      return;
    }
    res.send(data);
  });
});

server.get("/pg/:id", function (req, res) {
  const id = parseInt(req.params.id);
  dbPostgres.findAllMenusForId(id, function (err, data) {
    if (err) {
      console.log("error message: ", err);
      return;
    }
    res.send(data);
  });
});

module.exports = server;

