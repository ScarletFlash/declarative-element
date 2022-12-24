import type { Node } from '../declarations/interfaces/node.interface';
import { isWithTag } from '../type-guards/is-with-tag.type-guard';

export function getEmptyElementByNode(node: Node.WithTag): HTMLElement;
export function getEmptyElementByNode(node: Node.Text): Text;
export function getEmptyElementByNode(node: Node.Any): HTMLElement | Text;
export function getEmptyElementByNode(node: Node.Any): HTMLElement | Text {
  return isWithTag(node) ? document.createElement(node.tagName) : document.createTextNode('');
}
