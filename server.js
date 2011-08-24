var httpProxy = require('http-proxy')
  , express = require('express')
  , letters = require('racer/examples/letters')
  , todos = require('racer/examples/todos')
  , chat = require('derby/examples/chat');

var proxyServer = httpProxy.createServer({
  router: {
    'racerjs.com/letters': '127.0.0.1:3001',
    'racerjs.com/todos': '127.0.0.1:3002',
    'derbyjs.com/chat': '127.0.0.1:3003',
    'racerjs.com': '127.0.0.1:8001',
    'derbyjs.com': '127.0.0.1:8002'
  }
});
proxyServer.listen(8009);

racerJs = express.createServer();
racerJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/racer');
});
racerJs.listen(8001);

derbyJs = express.createServer();
derbyJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/derby');
});
derbyJs.get('/robots.txt', function (req, res) {
  res.send('User-agent: *\nDisallow: /chat/', {'Content-Type': 'text/plain'});
});
derbyJs.listen(8002);

