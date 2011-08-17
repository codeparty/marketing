var connect = require('connect')
  , letters = require('racer/examples/letters/index')
  , todos = require('racer/examples/todos/index');

var app = connect(
    connect.router( function (app) {
      app.get('/', function (req, res, next) {
        res.writeHead(303, { Location: 'https://github.com/codeparty/racer' });
        return res.end();
      });
    })
  , letters.app
  , todos.app
);

var socketio = require('socket.io');
io = socketio.listen(app);
letters.racer.ioSockets(io.sockets);
todos.racer.ioSockets(io.sockets);

app.listen(3000);
