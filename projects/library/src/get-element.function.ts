import type { Node } from './declarations/interfaces/node.interface';
import type { WithInnerTextTrait } from './declarations/traits/with-inner-text.trait';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './utilities/apply-attributes-if-present.utility';
import { getEmptyElementByNode } from './utilities/get-empty-element-by-node.utility';
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

const getTextNode = (node: WithInnerTextTrait<Node.Any>): Text => {
  const element: Text = getEmptyElementByNode(node);
  insertTextIfPresent({ element, node });
  return element;
};

const getTaggedNodeWithoutChildren = (node: Node.WithTag): HTMLElement => {
  const element: HTMLElement = getEmptyElementByNode(node);
  applyAttributesIfPresent({ element, node });
  return element;
};
