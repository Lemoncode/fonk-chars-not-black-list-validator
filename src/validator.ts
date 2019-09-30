import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'CHARS_NOT_BLACK_LIST';

let defaultMessage =
  'The value must be a string that not contain the following characters: {{blackList}}';
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

const validateType = value => typeof value === 'string';

const validate = ({ value, blackList }: Model) =>
  blackList.every(char => value.indexOf(char) === -1);

const mapToModel = (
  value: string,
  { matchCase, blackList }: CustomArgs
): Model =>
  !matchCase
    ? {
        value: value.toLowerCase().replace(/(.)(?=.*\1)/g, ''),
        blackList: blackList.map(char => char.toLowerCase()),
      }
    : {
        value: value.replace(/(.)(?=.*\1)/g, ''),
        blackList,
      };

interface CustomArgs {
  blackList: string[];
  matchCase?: boolean;
}

interface Model {
  value: string;
  blackList: string[];
}

const defaultCustomArgs: CustomArgs = {
  blackList: [],
  matchCase: false,
};

export const validator: FieldValidationFunctionSync = fieldValidatorArgs => {
  const {
    value,
    message = defaultMessage,
    customArgs = defaultCustomArgs,
  } = fieldValidatorArgs;

  const args: CustomArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  const succeeded =
    !isDefined(value) ||
    (validateType(value) && validate(mapToModel(value, args)));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, {
          blackList: `"${args.blackList.join('", "')}"`,
        }),
    type: VALIDATOR_TYPE,
  };
};
