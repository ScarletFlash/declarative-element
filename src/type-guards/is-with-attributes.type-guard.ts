import type { WithAttributesTrait } from '../declarations/traits/with-attributes.trait';
import { isObject } from './is-object.type-guard';

export function isWithAttributes<T>(input: T): input is Required<WithAttributesTrait<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithAttributesTrait = 'attributes';
  return targetKey in input && isObject(input[targetKey]);
}
