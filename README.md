# ErrorWrapper

A Base Class for creating error objects that wrap around other error objects
without trashing the stack trace of the original error. Stack traces will appear
in the following format:

```
ERROR MyCustomErrorWrapper Some Error Message
  at /path/to/some/js/file.js:123:456
  at /path/to/some/other/js/file.js:123:456
...
Caused By: Error: Some Other Error Message
  at /path/to/some/js/file.js:123:456
  at /path/to/some/other/js/file.js:123:456
```

## All the Badges...

[![NPM](https://nodei.co/npm/error-wrapper.png)](https://www.npmjs.com/package/error-wrapper)

[![Build Status](https://travis-ci.org/spudly/error-wrapper.svg?branch=master)](https://travis-ci.org/spudly/error-wrapper) [![Test Coverage](https://codeclimate.com/github/spudly/error-wrapper/badges/coverage.svg)](https://codeclimate.com/github/spudly/error-wrapper/coverage)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard) [![Code Climate](https://codeclimate.com/github/spudly/error-wrapper/badges/gpa.svg)](https://codeclimate.com/github/spudly/error-wrapper)

[![Dependencies](https://david-dm.org/spudly/error-wrapper.svg)](https://david-dm.org/spudly/error-wrapper) [![DevDependencies](https://david-dm.org/spudly/error-wrapper/dev-status.svg)](https://david-dm.org/spudly/error-wrapper#info=devDependencies)

## Usage

### es6
```js
import ErrorWrapper from 'error-wrapper';

class MyErrorWrapper extends ErrorWrapper {

  // Add extra properties/methods if desired:

  get code() {
    return 'MYERRORWRAPPER';
  }

}

// later...
throw new MyErrorWrapper('error message', originalError);
```

### es5 (nodejs, browserify)
```javascript
var ErrorWrapper = require('error-wrapper'),
    util = require('util');

function MyErrorWrapper() {
  ErrorWrapper.call(this);
}
util.inherits(MyErrorWrapper, ErrorWrapper);

// Add extra properties/methods if desired:
MyErrorWrapper.prototype.code = 'MYERRORWRAPPER';

// later...
throw new MyErrorWrapper('error message', originalError);
```

### coffeescript
```coffeescript
ErrorWrapper = require 'error-wrapper'

class MyErrorWrapper extends ErrorWrapper
  # Add extra properties/methods if desired:
  code: 'MYERRORWRAPPER'

# later...
throw new MyErrorWrapper 'error message', originalError
```

## License

MIT
