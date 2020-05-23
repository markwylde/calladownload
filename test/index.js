const http = require('http');
const fs = require('fs');

const test = require('righto-tape');
const righto = require('righto');

const calladownload = require('../');

function createServer (callback) {
  const server = http.createServer(function (request, response) {
    response.writeHead(200);
    response.write('This is a test');
    response.write(' at ' + request.url);

    if (request.headers['x-test-header']) {
      response.write(' header ' + request.headers['x-test-header']);
    }
    response.end();
  });

  server.on('listening', function () {
    callback(null, server);
  });

  server.listen();
}

test('download from http', function * (t) {
  t.plan(1);

  const server = yield righto(createServer);
  const destinationFile = '/tmp/' + Date.now() + '.html';
  yield righto(calladownload,
    `http://localhost:${server.address().port}`,
    destinationFile
  );

  const result = yield righto(fs.readFile, destinationFile, 'utf8');

  t.equal(result, 'This is a test at /');

  server.close();
});

test('download from http with header', function * (t) {
  t.plan(1);

  const server = yield righto(createServer);
  const destinationFile = '/tmp/' + Date.now() + '.html';
  yield righto(calladownload,
    `http://localhost:${server.address().port}`,
    destinationFile,
    {
      headers: {
        'X-Test-Header': 'yes'
      }
    }
  );

  const result = yield righto(fs.readFile, destinationFile, 'utf8');

  t.equal(result, 'This is a test at / header yes');

  server.close();
});

test('download from http with path', function * (t) {
  t.plan(1);

  const server = yield righto(createServer);
  const destinationFile = '/tmp/' + Date.now() + '.html';
  yield righto(calladownload,
    `http://localhost:${server.address().port}/test.html`,
    destinationFile,
    {}
  );

  const result = yield righto(fs.readFile, destinationFile, 'utf8');

  t.equal(result, 'This is a test at /test.html');

  server.close();
});
