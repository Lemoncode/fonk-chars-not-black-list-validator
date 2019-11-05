import { validator, setErrorMessage } from './validator';

const VALIDATOR_TYPE = 'CHARS_NOT_BLACK_LIST';

describe('fonk-chars-not-black-list-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({
      value,
      customArgs: { blackListChars: 'tnw5' },
    });

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
    const result = validator({
      value,
      customArgs: { blackListChars: 'tnw5' },
    });

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
    const result = validator({
      value,
      customArgs: { blackListChars: 'tnw5' },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 'test';
    const message = 'other message';

    // Act
    const result = validator({
      value,
      message,
      customArgs: { blackListChars: 'tnw5' },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = 'test';

    setErrorMessage('other message');

    // Act
    const result = validator({
      value,
      customArgs: { blackListChars: 'tnw5' },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value does not contain blacklist characters', () => {
    // Arrange
    const value = 'valid';

    // Act
    const result = validator({
      value,
      customArgs: { blackListChars: 'tnw5' },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation with interpolated message', () => {
    // Arrange
    const value = 'not valid';

    // Act
    const result = validator({
      value,
      message: `The field can not contain the following characters: '{{blackListChars}}'`,
      customArgs: { blackListChars: 'tnw5' },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: `The field can not contain the following characters: 'tnw5'`,
      type: VALIDATOR_TYPE,
    });
  });
});
