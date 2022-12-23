import type { Node } from './declarations/node.interface';
import type { WithInnerTextTrait } from './declarations/traits/with-inner-text.trait';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './utilities/apply-attributes-if-present.utility';
import { getHierarchy } from './utilities/get-hierarchy.utility';
import { insertTextIfPresent } from './utilities/insert-text-if-present.utility';

export function getElement(node: Node.TextWithTag | Node.WithTag | Node.WithChildren): HTMLElement;
export function getElement(node: Node.Text): Text;
export function getElement(node: Node.Any): HTMLElement | Text {
  if (isWithInnerText(node)) {
    return getTextNode(node);
  }

  if (isWithChildren(node)) {
    return getHierarchy(node);
  }

  if (isWithTag(node)) {
    return getTaggedNodeWithoutChildren(node);
  }

  throw new Error('Unsupported root node type');
}

function getTextNode(node: WithInnerTextTrait<Node.Any>): HTMLElement | Text {
  const element: HTMLElement | Text = isWithTag(node)
    ? document.createElement(node.tagName)
    : document.createTextNode('');
  insertTextIfPresent(element, node);
  return element;
}

function getTaggedNodeWithoutChildren(node: Node.WithChildren): never;
function getTaggedNodeWithoutChildren(node: Node.WithTag): HTMLElement;
function getTaggedNodeWithoutChildren(node: Node.WithTag): HTMLElement {
  const element: HTMLElement = document.createElement(node.tagName);
  applyAttributesIfPresent(element, node);
  return element;
}
