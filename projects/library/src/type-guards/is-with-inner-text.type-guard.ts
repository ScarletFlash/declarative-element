import type { WithInnerTextTrait } from '../declarations/traits/with-inner-text.trait';
import { isObject } from './is-object.type-guard';

export const isWithInnerText = <T>(input: T): input is Required<WithInnerTextTrait<T>> => {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithInnerTextTrait = 'innerText';
  return targetKey in input && typeof input[targetKey] === 'string';
};
