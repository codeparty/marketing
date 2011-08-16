var httpProxy = require('http-proxy')
  , http = require('http')
  , connect = require('connect')
  , letters = require('racer/examples/letters/index')
  , todos = require('racer/examples/todos/index');

httpProxy.createServer({
    hostnameOnly: true
  , router: {
        'letters.racerjs.com': '127.0.0.1:3001'
      , 'todos.racerjs.com': '127.0.0.1:3002'
      , 'racerjs.com': '127.0.0.1: 3003'
      , 'www.racerjs.com': '127.0.0.1:3003'
    }
}).listen(80);

connect(
  connect.router( function (app) {
    app.get('/', function (req, res, next) {
      res.writeHead(303, { Location: 'https://github.com/codeparty/racer' });
      return res.end();
    });
  })
).listen(3003);

// Clear any existing data, then initialize
letters.store.flush( function (err) {
  if (err) throw err;
  letters.app.listen(3001);
});

todos.store.flush( function (err) {
  if (err) throw err;
  todos.app.listen(3002);
});
