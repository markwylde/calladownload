const http = require('http');
const https = require('https');
const fs = require('fs');

function calladownload (sourceUrl, destinationPath, options, callback) {
  if (arguments.length === 3) {
    callback = options;
    options = {};
  }

  const uri = new URL(sourceUrl);
  const headers = options.headers || {};

  const httpOrHttps = uri.protocol === 'https:' ? https : http;
  const opts = {
    headers,
    method: 'GET',
    hostname: uri.hostname,
    port: uri.port,
    path: `${uri.pathname}${uri.search}`,
    protocol: uri.protocol,
    ...options
  };

  const writer = fs.createWriteStream(destinationPath);

  writer.on('error', function (error) {
    const preparedError = new Error('error saving downloaded file');
    Object.assign(preparedError, {
      code: 'REQUEST_ERROR',
      ...error,
      request
    });
    callback(error);
  });

  writer.on('finish', () => {
    callback();
  });

  const request = httpOrHttps.request(opts, (response) => {
    response.pipe(writer);
  });

  request.on('error', (error) => {
    const preparedError = new Error('error downloading file');
    Object.assign(preparedError, {
      code: 'REQUEST_ERROR',
      ...error,
      request
    });
    callback(preparedError);
  });

  request.end();
}

module.exports = calladownload;
