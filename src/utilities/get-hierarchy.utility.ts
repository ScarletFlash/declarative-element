import type { Node } from '../declarations/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { isWithChildren } from '../type-guards/is-with-children.type-guard';
import { isWithInnerText } from '../type-guards/is-with-inner-text.type-guard';
import { isWithTag } from '../type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './apply-attributes-if-present.utility';
import { insertTextIfPresent } from './insert-text-if-present.utility';

let rootElement: HTMLElement;
let currentNode: WithParentTrait<Node.Any>;
let currentElement: HTMLElement | Text;
let unprocessedNodes: WithParentTrait<Node.Any>[];

export function getHierarchy(rootNode: Node.WithChildren): HTMLElement {
  rootElement = document.createElement(rootNode.tagName);
  currentNode = getNodeWithParent(rootNode, null);
  currentElement = rootElement;
  unprocessedNodes = [currentNode];

  do {
    applyAttributesIfPresent(currentElement, currentNode);
    insertTextIfPresent(currentElement, currentNode);

    unwrapChildren();
    insertCurrentNodeIntoHierarchy();
    setNextIterationArguments();
  } while (unprocessedNodes.length !== 0);

  return rootElement;
}

function getNextNode(): WithParentTrait<Node.Any> | undefined {
  return unprocessedNodes[0];
}

function getCurrentElementChildrenWithParentRef(): WithParentTrait<Node.Any>[] {
  if (currentElement instanceof HTMLElement) {
    return getChildrenWithParent(currentNode, currentElement);
  }

  return [];
}

function getNodeWithParent(node: Node.Any, parent: HTMLElement | null): WithParentTrait<Node.Any> {
  const parentKey: keyof WithParentTrait = 'parent';
  const propertyDescriptor: PropertyDescriptor = {
    value: parent,
    writable: false,
    enumerable: true,
    configurable: false,
  };
  return Object.create(node, {
    [parentKey]: propertyDescriptor,
  });
}

function getChildrenWithParent(node: WithParentTrait<Node.Any>, element: HTMLElement): WithParentTrait<Node.Any>[] {
  if (!isWithChildren(node)) {
    return [];
  }
  return node.children.map((child: Node.Any): WithParentTrait<Node.Any> => getNodeWithParent(child, element));
}

function unwrapChildren(): void {
  unprocessedNodes.splice(0, 1, ...getCurrentElementChildrenWithParentRef());
}

function insertCurrentNodeIntoHierarchy(): void {
  if (currentNode.parent === null) {
    return;
  }
  currentNode.parent.appendChild(currentElement);
}

function setNextIterationArguments(): void {
  const nextNode: WithParentTrait<Node.Any> | undefined = getNextNode();
  if (nextNode === undefined) {
    return;
  }
  currentNode = nextNode;

  if (isWithTag(nextNode)) {
    currentElement = document.createElement(nextNode.tagName);
    return;
  }

  if (isWithInnerText(nextNode)) {
    currentElement = document.createTextNode(nextNode.innerText);
  }
}
