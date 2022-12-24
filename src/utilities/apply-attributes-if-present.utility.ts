import type { NodeWithElement } from '../declarations/interfaces/node-with-element.interface';
import { isHtmlElement } from '../type-guards/is-html-element.type-guard';
import { isWithAttributes } from '../type-guards/is-with-attributes.type-guard';

export const applyAttributesIfPresent = ({ element, node }: NodeWithElement): void => {
  if (!isHtmlElement(element)) {
    return;
  }

  if (!isWithAttributes(node)) {
    return;
  }

  Object.entries(node.attributes).forEach(([key, value]: [string, string]) => {
    element.setAttribute(key, value);
  });
};
