import type { NodeWithElement } from '../declarations/interfaces/node-with-element.interface';
import type { WithInnerTextTrait } from '../declarations/traits/with-inner-text.trait';
import { isHtmlElement } from '../type-guards/is-html-element.type-guard';
import { isWithInnerText } from '../type-guards/is-with-inner-text.type-guard';

export const insertTextIfPresent = ({ element, node }: NodeWithElement): void => {
  if (!isWithInnerText(node)) {
    return;
  }
  const { innerText }: WithInnerTextTrait = node;

  if (isHtmlElement(element)) {
    element.innerHTML = innerText;
    return;
  }

  element.nodeValue = innerText;
};
