import {assert} from 'chai';
import ErrorWrapper from '../src/ErrorWrapper';

const {strictEqual, equal, doesNotThrow, include: includes, isString} = assert;

const WRAPPER_MESSAGE = '__MESSAGE__';
const WRAPPED_MESSAGE = '__WRAPPED_MESSAGE__';
const WRAPPED_STACK = '__WRAPPED_STACK__';

class ErrorWrapperSubclass extends ErrorWrapper {}

const originalError = new Error(WRAPPED_MESSAGE);
originalError.stack = WRAPPED_STACK;

const tests = {

  ErrorWrapper: {

    'Subclass of ErrorWrapper': {

      'can be instantiated': () => {
        doesNotThrow(
          () => new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError)
        );
      },

      'ErrorWrapper Subclass instance': {

        'should have a name': () => {
          const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
          equal(instance.name, 'ErrorWrapperSubclass');
        },

        'should have a childError property': () => {
          const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
          strictEqual(instance.childError, originalError);
        },

        'should have a stack': () => {
          const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
          isString(instance.stack);
          equal(typeof instance.stack, 'string');
          includes(instance.stack, `ErrorWrapperSubclass: ${WRAPPER_MESSAGE}`);
        },

        'stack trace contains child\'s stack trace': () => {
          const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
          includes(instance.stack, `\nCaused by: ${WRAPPED_STACK}`);
        },

        'should have a message': () => {
          const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
          equal(instance.message, WRAPPER_MESSAGE);
        },

        'has a toString() method': () => {
          const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
          equal(typeof instance.toString, 'function');
          equal(instance.toString(), `ErrorWrapperSubclass: ${WRAPPER_MESSAGE}`);
        },
      },
    },
  },
};

export default tests;
