var fs = require('fs')
  , dirname = require('path').dirname
  , cp = require('child_process')
  , bouncy = require('bouncy')
  , express = require('express')
  , examples = [
      'derby/examples/hello'
    , 'derby/examples/sink'
    , 'derby/examples/chat'
    , 'derby/examples/todos'
    , 'racer/examples/letters'
    , 'racer/examples/pad'
    , 'racer/examples/todos'
    ]
  , routeTable = {
      'racerjs.com':         8001
    , 'www.racerjs.com':     8001
    , 'hello.derbyjs.com':   3000
    , 'sink.derbyjs.com':    3001
    , 'chat.derbyjs.com':    3002
    , 'todos.derbyjs.com':   3003
    , 'letters.racerjs.com': 3010
    , 'pad.racerjs.com':     3011
    , 'todos.racerjs.com':   3012
    }
  , port = process.env.NODE_ENV == 'production' ? 80 : 8080

examples.forEach(function(example) {
  var path = require.resolve(example)
  cp.fork(path, [], {
    cwd: dirname(path)
  , env: process.env
  });
});

racerJs = express.createServer();
racerJs.get('/', function (req, res) {
  res.redirect('https://github.com/codeparty/racer');
});
racerJs.listen(8001);

bouncy(function (req, bounce) {
  bounce(routeTable[req.headers.host] || 8001);
}).listen(port, function() {

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
