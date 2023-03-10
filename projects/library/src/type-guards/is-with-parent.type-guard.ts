import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { isHtmlElement } from './is-html-element.type-guard';
import { isObject } from './is-object.type-guard';

export const isWithParent = <T>(input: T): input is Required<WithParentTrait<T>> => {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithParentTrait = 'parent';
  return targetKey in input && isHtmlElement(input[targetKey]);
};
