/* eslint-disable prefer-reflect */ // for browser compatibility

import ErrorSubclass from 'error-subclass';

class ErrorWrapper extends ErrorSubclass {

  constructor(message, childError) {
    super(message);
    this.childError = childError;
    const stack = this.stack;
    Object.defineProperty(this, 'stack', {
      get() {
        return `${stack}\nCaused by: ${this.childError.stack}`;
      },
    });
  }

}

export default ErrorWrapper;
