var express = require('express')
  , letters = require('racer/examples/letters/index')
  , todos = require('racer/examples/todos/index');

var app = express.createServer(
    express.vhost('letters.racerjs.com', letters.app)
  , express.vhost('todos.racerjs.com', todos.app)
);
app.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/racer')
});


var appsSettingUp = 2;

// Clear any existing data, then initialize
letters.store.flush( function (err) {
  if (err) throw err;
  --appsSettingUp || app.listen(3000);
});

todos.store.flush( function (err) {
  if (err) throw err;
  --appsSettingUp || app.listen(3000);
});
