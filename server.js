var httpProxy = require('http-proxy')
  , express = require('express')
  , letters = require('racer/examples/letters')
  , todos = require('racer/examples/todos')
  , chat = require('derby/examples/chat');

var proxyServer = httpProxy.createServer(function (req, res, proxy) {
  var host = req.headers.host,
      url = req.url,
      reLetters = /^\/letters\//,
      iLetters = reLetters.source.length,
      reTodos = /^\/todos\//,
      iTodos = reTodos.source.length,
      reChat = /^\/chat\//,
      iChat = reChat.source.length;
  
  if (host === 'racerjs.com') {          
    if (reLetters.test(url)) {
      req.url = '/' + req.url.substr(iLetters);
      proxy.proxyRequest(req, res, { host: 'localhost', port: '3001' });
    } else if (reTodos.test(url)) {
      req.url = '/' + req.url.substr(iTodos);
      proxy.proxyRequest(req, res, { host: 'localhost', port: '3002' });
    } else {
      proxy.proxyRequest(req, res, { host: 'localhost', port: '8001' });
    }
  
  } else if (host === 'derbyjs.com') {
    if (reChat.test(url)) {
      req.url = '/' + req.url.substr(iChat);
      proxy.proxyRequest(req, res, { host: 'localhost', port: '3003' });
    } else {
      proxy.proxyRequest(req, res, { host: 'localhost', port: '8002' });
    }
  }

}).listen(process.env.NODE_ENV == 'production' ? 80 : 8080);


racerJs = express.createServer();
racerJs.get('/', function (req, res) {
  var host = req.headers.host,
      url = req.
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

