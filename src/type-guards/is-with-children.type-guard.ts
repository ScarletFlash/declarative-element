import type { WithChildrenTrait } from '../declarations/traits/with-children.trait';
import { isObject } from './is-object.type-guard';

export const isWithChildren = <T>(input: T): input is Required<WithChildrenTrait<T>> => {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithChildrenTrait = 'children';
  return targetKey in input && Array.isArray(input[targetKey]);
};
