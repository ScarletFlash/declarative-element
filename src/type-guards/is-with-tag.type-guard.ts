import type { WithTagNameTrait } from '../declarations/traits/with-tag-name.trait';
import { isObject } from './is-object.type-guard';

export function isWithTag<T>(input: T): input is Required<WithTagNameTrait<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithTagNameTrait = 'tagName';
  return targetKey in input && typeof input[targetKey] === 'string';
}
