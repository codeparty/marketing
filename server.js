var fs = require('fs')
  , cp = require('child_process')
  , httpProxy = require('http-proxy')
  , express = require('express')

cp.fork(require.resolve('derby/examples/hello'));
cp.fork(require.resolve('derby/examples/sink'));
cp.fork(require.resolve('derby/examples/chat'));
cp.fork(require.resolve('derby/examples/todos'));
cp.fork(require.resolve('racer/examples/letters'));
cp.fork(require.resolve('racer/examples/pad'));
cp.fork(require.resolve('racer/examples/todos'));

racerJs = express.createServer();
racerJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/racer');
});
racerJs.listen(8001);

httpProxy.createServer({
  hostnameOnly: true,
  router: {
    'racerjs.com':         '127.0.0.1:8001'
  , 'www.racerjs.com':     '127.0.0.1:8001'
  , 'hello.derbyjs.com':   '127.0.0.1:3000'
  , 'sink.derbyjs.com':    '127.0.0.1:3001'
  , 'chat.derbyjs.com':    '127.0.0.1:3002'
  , 'todos.derbyjs.com':   '127.0.0.1:3003'
  , 'letters.racerjs.com': '127.0.0.1:3010'
  , 'pad.racerjs.com':     '127.0.0.1:3011'
  , 'todos.racerjs.com':   '127.0.0.1:3012'
  }
}).listen(process.env.NODE_ENV == 'production' ? 80 : 8080, function() {

  // If run as root, downgrade to the owner of this file
  if (process.getuid() === 0) {
    fs.stat(__filename, function(err, stats) {
      if (err) return console.log(err);
      process.setuid(stats.uid);
    })
  }
});

process.on('uncaughtException', function(err) {
  console.error(err.stack || err);
});
