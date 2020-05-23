# calladownload
[![Build Status](https://travis-ci.org/markwylde/calladownload.svg?branch=master)](https://travis-ci.org/markwylde/calladownload)
[![David DM](https://david-dm.org/markwylde/calladownload.svg)](https://david-dm.org/markwylde/calladownload)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/calladownload)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/calladownload)](https://github.com/markwylde/calladownload/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/calladownload)](https://github.com/markwylde/calladownload/blob/master/LICENSE)

A native library to download a file from http or https

## Installation
```bash
npm install --save calladownload
```

## Example
### With callbacks
```javascript
calladownload(`http://example.com/index.html`, '/tmp/index.html', function (error) {
  console.log(error ? error : 'Downloaded successfully')
})
```

## License
This project is licensed under the terms of the MIT license.
