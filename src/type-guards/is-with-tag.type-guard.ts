import type { WithTagName } from '../declarations/traits/with-tag-name.trait';
import { isObject } from './is-object.type-guard';

export function isWithTag<T>(input: T): input is Required<WithTagName<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithTagName = 'tagName';
  return targetKey in input && typeof input[targetKey] === 'string';
}
