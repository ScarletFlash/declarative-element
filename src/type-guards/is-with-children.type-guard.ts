import type { WithChildren } from '../declarations/traits/with-children.trait';
import { isObject } from './is-object.type-guard';

export function isWithChildren<T>(input: T): input is Required<WithChildren<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithChildren = 'children';
  return targetKey in input && Array.isArray(input[targetKey]);
}
