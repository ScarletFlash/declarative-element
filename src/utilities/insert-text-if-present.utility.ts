import type { Node } from '../declarations/node.interface';
import type { WithInnerTextTrait } from '../declarations/traits/with-inner-text.trait';
import { isWithInnerText } from '../type-guards/is-with-inner-text.type-guard';

export function insertTextIfPresent(element: HTMLElement | Text, node: Node.Any): void {
  if (!isWithInnerText(node)) {
    return;
  }
  const { innerText }: WithInnerTextTrait = node;

  if (element instanceof HTMLElement) {
    element.innerHTML = innerText;
    return;
  }

  element.nodeValue = innerText;
}
