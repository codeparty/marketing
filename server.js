var bouncy = require('bouncy')
  , express = require('express')
  , letters = require('racer/examples/letters')
  , pad = require('racer/examples/pad')
  , todos = require('racer/examples/todos')
  , hello = require('derby/examples/hello')
  , sink = require('derby/examples/sink')
  , chat = require('derby/examples/chat');

racerJs = express.createServer();
racerJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/racer');
});
racerJs.listen(8001);

bouncy(function (req, bounce) {
  req.on('error', function(err) { console.error(err.message) });
  switch (req.headers.host) {
    case 'racerjs.com':
    case 'www.racerjs.com':
      return bounce(8001);
    case 'letters.racerjs.com':
      return bounce(3010);
    case 'pad.racerjs.com':
      return bounce(3011);
    case 'todos.racerjs.com':
      return bounce(3012);
    case 'hello.derbyjs.com':
      return bounce(3000);
    case 'sink.derbyjs.com':
      return bounce(3001);
    case 'chat.derbyjs.com':
      return bounce(3002);
  }
}).listen(process.env.NODE_ENV == 'production' ? 80 : 8080);
