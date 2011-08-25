var httpProxy = require('http-proxy')
  , express = require('express')
  , letters = require('racer/examples/letters')
  , todos = require('racer/examples/todos')
  , chat = require('derby/examples/chat');

httpProxy.createServer({
  hostnameOnly: true,
  router: {
    'letters.racerjs.com': '127.0.0.1:3001',
    'todos.racerjs.com': '127.0.0.1:3002',
    'racerjs.com': '127.0.0.1:8001',
    'chat.derbyjs.com': '127.0.0.1:3003',
    'derbyjs.com': '127.0.0.1:8002'
  }
}).listen(process.env.NODE_ENV == 'production' ? 80 : 8080);


racerJs = express.createServer();
racerJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/racer');
});
racerJs.listen(8001);

derbyJs = express.createServer();
derbyJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/derby');
});
derbyJs.listen(8002);

