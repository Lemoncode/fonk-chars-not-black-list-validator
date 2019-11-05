import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'CHARS_NOT_BLACK_LIST';

let defaultMessage = `The field can not contain the following characters: '{{blackListChars}}'`;
export const setErrorMessage = (message: string) => (defaultMessage = message);

const containsBlackListChars = (input: string, blackListChars: string) =>
  new RegExp(`[${blackListChars}]+`, 'g').test(input);

const isDefined = (value: string) =>
  value !== void 0 && value !== null && value !== '';

interface CustomValidatorArgs {
  blackListChars: string;
}

const validateType = (value: string) => typeof value === 'string';

export const validator: FieldValidationFunctionSync<
  CustomValidatorArgs
> = fieldValidatorArgs => {
  const { value, message = defaultMessage, customArgs } = fieldValidatorArgs;
  const { blackListChars } = customArgs;

  const succeeded =
    !isDefined(value) ||
    (validateType(value) &&
      validateType(blackListChars) &&
      !containsBlackListChars(value, blackListChars));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(
          (message as string) || defaultMessage,
          customArgs
        ),
    type: VALIDATOR_TYPE,
  };
};
