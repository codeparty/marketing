var fs = require('fs')
  , dirname = require('path').dirname
  , cp = require('child_process')
  , httpProxy = require('http-proxy')
  , http = require('http')
  , express = require('express')
  , examples = [
      'derby-examples/hello'
    , 'derby-examples/sink'
    , 'derby-examples/chat'
    , 'derby-examples/todos'
    , 'derby-examples/directory'
    , 'derby-examples/widgets'
    // , 'racer/examples/letters'
    // , 'racer/examples/pad'
    // , 'racer/examples/todos'
    ]

examples.forEach(function(example) {
  var path = require.resolve(example)
  cp.fork(path, [], {
    cwd: dirname(path)
  , env: process.env
  });
});

racerJs = express();
racerJs.get('/', function(req, res) {
  res.redirect('https://github.com/codeparty/racer');
});
http.createServer(racerJs).listen(8001);

httpProxy.createServer({
  hostnameOnly: true,
  router: {
    'racerjs.com':            '127.0.0.1:8001'
  , 'www.racerjs.com':        '127.0.0.1:8001'
  , 'hello.derbyjs.com':      '127.0.0.1:3000'
  , 'sink.derbyjs.com':       '127.0.0.1:3001'
  , 'chat.derbyjs.com':       '127.0.0.1:3002'
  , 'todos.derbyjs.com':      '127.0.0.1:3003'
  , 'directory.derbyjs.com':  '127.0.0.1:3004'
  , 'widgets.derbyjs.com':    '127.0.0.1:3005'
  , 'letters.racerjs.com':    '127.0.0.1:3010'
  , 'pad.racerjs.com':        '127.0.0.1:3011'
  , 'todos.racerjs.com':      '127.0.0.1:3012'
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

// process.on('uncaughtException', function(err) {
//   console.error(err.stack || err);
// });
