import ErrorWrapper from './ErrorWrapper';

const WRAPPER_MESSAGE = '__MESSAGE__';
const WRAPPED_MESSAGE = '__WRAPPED_MESSAGE__';
const WRAPPED_STACK = '__WRAPPED_STACK__';

class ErrorWrapperSubclass extends ErrorWrapper {}

const originalError = new Error(WRAPPED_MESSAGE);
originalError.stack = WRAPPED_STACK;

test('Subclass of ErrorWrapper can be instantiated', () => {
  expect(() => new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError)).not.toThrow();
});

test('ErrorWrapper Subclass instance should have a name', () => {
  const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
  expect(instance.name).toBe('ErrorWrapperSubclass');
});

test('ErrorWrapper Subclass instance should have a childError property', () => {
  const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
  expect(instance.childError).toBe(originalError);
});

test('ErrorWrapper Subclass instance should have a stack', () => {
  const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
  expect(typeof instance.stack).toBe('string');
  expect(instance.stack).toMatch(`ErrorWrapperSubclass: ${WRAPPER_MESSAGE}`);
});

test("ErrorWrapper Subclass instance stack trace contains child's stack trace", () => {
  const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
  expect(instance.stack).toMatch(`\nCaused by: ${WRAPPED_STACK}`);
});

test('ErrorWrapper Subclass instance should have a message', () => {
  const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
  expect(instance.message).toBe(WRAPPER_MESSAGE);
});

test('ErrorWrapper Subclass instance has a toString() method', () => {
  const instance = new ErrorWrapperSubclass(WRAPPER_MESSAGE, originalError);
  expect(typeof instance.toString).toBe('function');
  expect(instance.toString()).toBe(`ErrorWrapperSubclass: ${WRAPPER_MESSAGE}`);
});
