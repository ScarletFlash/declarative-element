import type { Node } from './../declarations/node.interface';
import { isWithAttributes } from './../type-guards/is-with-attributes.type-guard';

export function applyAttributesIfPresent(element: HTMLElement | Text, node: Node.Any): void {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  if (!isWithAttributes(node)) {
    return;
  }

  Object.entries(node.attributes).forEach(([key, value]: [string, string]) => {
    element.setAttribute(key, value);
  });
}
