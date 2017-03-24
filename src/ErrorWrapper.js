/* eslint-disable prefer-reflect */ // for browser compatibility

import ErrorSubclass from 'error-subclass';

class ErrorWrapper extends ErrorSubclass {
  constructor(message, childError) {
    super(message);
    this.childError = childError;

    const stackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
    const getStack = stackDescriptor.get || (() => stackDescriptor.value);

    Object.defineProperty(this, 'stack', {
      get: () => `${getStack.call(this)}\nCaused by: ${this.childError.stack}`
    });
  }
}

export default ErrorWrapper;
