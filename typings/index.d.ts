import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace charsNotBlackList {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
