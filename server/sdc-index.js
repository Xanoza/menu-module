const server = require('./sdc-server.js');

const port = 3000;

server.listen(port, function () {
  console.log('listening on port: ', port);
});
