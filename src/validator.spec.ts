import { validator, setErrorMessage } from './validator';

const VALIDATOR_TYPE = 'CHARS_NOT_BLACK_LIST';
const DEFAULT_MESSAGE =
  'The value must be a string that not contain the following characters: "a", "b", "c"';
const DEFAULT_CUSTOM_ARGS = {
  blackList: ['a', 'b', 'c'],
};

describe('fonk-chars-not-black-list-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({ value, customArgs: DEFAULT_CUSTOM_ARGS });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = validator({ value, customArgs: DEFAULT_CUSTOM_ARGS });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({ value, customArgs: DEFAULT_CUSTOM_ARGS });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 1;
    const message = 'other message';

    // Act
    const result = validator({
      value,
      message,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when type of feeds value is number', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is true', () => {
    // Arrange
    const value = true;

    // Act
    const result = validator({
      value,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = validator({
      value,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = validator({
      value,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = validator({
      value,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a function', () => {
    // Arrange
    const value = () => null;

    // Act
    const result = validator({
      value,
      customArgs: DEFAULT_CUSTOM_ARGS,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is not a valid string', () => {
    // Arrange
    const value = 'Hello test';

    // Act
    const result = validator({
      value,
      customArgs: { blackList: ['t', 'e', 's', 't'] },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message:
        'The value must be a string that not contain the following characters: "t", "e", "s", "t"',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeded validation when it feeds value is a valid string', () => {
    // Arrange
    const value = 'Hello test';

    // Act
    const result = validator({
      value,
      customArgs: { blackList: ['a', 'b', 'c', 'd'] },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeded validation when it feeds value is a valid string matching case', () => {
    // Arrange
    const value = 'HELLO TEST';

    // Act
    const result = validator({
      value,
      customArgs: { blackList: ['t', 'e', 's', 't'], matchCase: true },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeded validation when it feeds value is a string and blacklist is an empty array', () => {
    // Arrange
    const value = 'HELLO TEST';

    // Act
    const result = validator({
      value,
      customArgs: { blackList: [], matchCase: true },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeded validation when it feeds value is an empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({
      value,
      customArgs: { blackList: ['a', 'b', 'c'], matchCase: true },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an string with whitespaces and whitespace is blacklisted', () => {
    // Arrange
    const value = 'hello test';

    // Act
    const result = validator({
      value,
      customArgs: { blackList: [' '], matchCase: true },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message:
        'The value must be a string that not contain the following characters: " "',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = 1;

    setErrorMessage('other message');

    // Act
    const result = validator({ value, customArgs: DEFAULT_CUSTOM_ARGS });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });
});
