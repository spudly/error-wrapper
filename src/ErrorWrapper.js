import ErrorSubclass from 'error-subclass';

class ErrorWrapper extends ErrorSubclass {

  constructor (message, childError) {
    super(message);
    this.childError = childError;
    let stack = this.stack;
    Object.defineProperty(this, 'stack', {
      get: function () {
        return `${stack}\nCaused by: ${this.childError.stack}`;
      }
    });
  }
}

export default ErrorWrapper;
