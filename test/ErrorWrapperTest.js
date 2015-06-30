import ErrorWrapper from '../src/ErrorWrapper';
import {assert} from 'chai';
let {strictEqual, equal, doesNotThrow, include: includes, isString} = assert;

const WRAPPER_MESSAGE = '__MESSAGE__';
const WRAPPED_MESSAGE = '__WRAPPED_MESSAGE__';
const WRAPPED_STACK = '__WRAPPED_STACK__';

class ErrorWrapperSubclass extends ErrorWrapper {}

let instance;
let originalError = new Error(WRAPPED_MESSAGE);
originalError.stack = WRAPPED_STACK;

var tests = {

  ErrorWrapper: {

    'Subclass of ErrorWrapper': {

      'can be instantiated': function () {
        doesNotThrow(function () {
          instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
        });
      },

      'ErrorWrapper Subclass instance': {

        before: function () {
          instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
        },

        'should have a name': function () {
          equal(instance.name, 'ErrorWrapperSubclass');
        },

        'should have a childError property': function () {
          strictEqual(instance.childError, originalError);
        },

        'should have a stack': function () {
          isString(instance.stack);
          equal(typeof instance.stack, 'string');
          includes(instance.stack, 'ErrorWrapperSubclass: ' + WRAPPER_MESSAGE);
        },

        'stack trace contains child\'s stack trace': function () {
          includes(instance.stack, '\nCaused by: ' + WRAPPED_STACK);
        },

        'should have a message': function () {
          equal(instance.message, WRAPPER_MESSAGE);
        },

        'has a toString() method': function () {
          equal(typeof instance.toString, 'function');
          equal(instance.toString(), 'ErrorWrapperSubclass: ' + WRAPPER_MESSAGE);
        }

      }

    }

  }
};

export default tests;
