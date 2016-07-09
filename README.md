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

[![Build Status](https://travis-ci.org/spudly/error-wrapper.svg?branch=master)](https://travis-ci.org/spudly/error-wrapper)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

[![Dependencies](https://david-dm.org/spudly/error-wrapper.svg)](https://david-dm.org/spudly/error-wrapper) [![DevDependencies](https://david-dm.org/spudly/error-wrapper/dev-status.svg)](https://david-dm.org/spudly/error-wrapper#info=devDependencies)

## Usage

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

## License

MIT
