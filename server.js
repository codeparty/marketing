var connect = require('connect')
  , letters = require('racer/examples/letters/index')
  , todos = require('racer/examples/todos/index')
  , Racer = require('racer').Racer
  , socketio = require('socket.io');

var app = connect(
    connect.router( function (app) {
      app.get('/', function (req, res, next) {
        res.writeHead(303, { Location: 'https://github.com/codeparty/racer' });
        return res.end();
      });
    })
);

var io = socketio.listen(app);

app.use(
  letters(new Racer({
      redis: {db: 1}
    , sockets: io.of('/sio/letters')
    , socketUri: '/sio/letters'
  })).app
);

app.use(
  todos(new Racer({
      redis: {db: 2}
    , sockets: io.of('/sio/todos')
    , socketUri: '/sio/todos'
  })).app
);

app.listen(80);
