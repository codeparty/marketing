var httpProxy = require('http-proxy')
  , express = require('express')
  , letters = require('racer/examples/letters')
  , todos = require('racer/examples/todos')
  , chat = require('derby/examples/chat');

var proxyServer = httpProxy.createServer({
  router: {
    'racerjs.com/letters': '127.0.0.1:3001',
    'racerjs.com/todos': '127.0.0.1:3002',
    'racerjs.com': '127.0.0.1:8001',
    'derbyjs.com/chat': '127.0.0.1:3003',
    'derbyjs.com': '127.0.0.1:8002'
  }
});
proxyServer.listen(80);

express.createServer()
  .get('/', function (req, res) {
    res.redirect('https://github.com/codeparty/racer');
  })
  .listen(8001);

express.createServer()
  .get('/', function (req, res) {
    res.redirect('https://github.com/codeparty/derby');
  })
  .get('/robots.txt', (req, res) {
    res.send('User-agent: *\nDisallow: /chat/', 'Content-Type': 'text/plain');
  })
  .listen(8002);

