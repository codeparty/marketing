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
var io = socketio.listen(app);
letters.racer.ioSockets(io.of('/sio/letters'), 'http://localhost:3000/sio/letters');
todos.racer.ioSockets(io.of('/sio/todos'), 'http://localhost:3000/sio/todos');

app.listen(3000);
