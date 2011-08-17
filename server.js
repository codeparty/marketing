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

var numApps = 2;

// Clear any existing data, then initialize
letters.store.flush( function (err) {
  if (err) throw err;
  --numApps || app.listen(3000);
});

todos.store.flush( function (err) {
  if (err) throw err;
  --numApps || app.listen(3000);
});
