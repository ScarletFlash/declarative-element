import type { Node } from '../declarations/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { isWithChildren } from '../type-guards/is-with-children.type-guard';
import { isWithInnerText } from '../type-guards/is-with-inner-text.type-guard';
import { isWithTag } from '../type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './apply-attributes-if-present.utility';
import { insertTextIfPresent } from './insert-text-if-present.utility';

interface CurrentIterationArguments {
  currentNode: WithParentTrait<Node.Any>;
  currentElement: HTMLElement | Text;
}

interface IterationContext extends CurrentIterationArguments {
  readonly rootElement: HTMLElement;
  readonly unprocessedNodes: WithParentTrait<Node.Any>[];
}

export const getHierarchy = (rootNode: Node.WithChildren): HTMLElement => {
  const rootElement: HTMLElement = document.createElement(rootNode.tagName);
  const rootNodeWithParent: WithParentTrait<Node.Any> = getNodeWithParent(rootNode, null);
  const context: IterationContext = {
    rootElement,
    currentNode: rootNodeWithParent,
    currentElement: rootElement,
    unprocessedNodes: [rootNodeWithParent],
  };

  do {
    applyAttributesIfPresent(context.currentElement, context.currentNode);
    insertTextIfPresent(context.currentElement, context.currentNode);

    unwrapChildren(context);
    insertCurrentNodeIntoHierarchy(context);
    setNextIterationArguments(context);
  } while (context.unprocessedNodes.length !== 0);

  return rootElement;
};

const getCurrentElementChildrenWithParentRef = ({
  currentElement,
  currentNode,
}: CurrentIterationArguments): WithParentTrait<Node.Any>[] => {
  if (currentElement instanceof HTMLElement) {
    return getChildrenWithParent(currentNode, currentElement);
  }

  return [];
};

const getNodeWithParent = (node: Node.Any, parent: HTMLElement | null): WithParentTrait<Node.Any> => {
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
};

const getChildrenWithParent = (node: WithParentTrait<Node.Any>, element: HTMLElement): WithParentTrait<Node.Any>[] => {
  if (!isWithChildren(node)) {
    return [];
  }
  return node.children.map((child: Node.Any): WithParentTrait<Node.Any> => getNodeWithParent(child, element));
};

const unwrapChildren = (context: IterationContext): void => {
  context.unprocessedNodes.splice(0, 1, ...getCurrentElementChildrenWithParentRef(context));
};

const insertCurrentNodeIntoHierarchy = ({ currentElement, currentNode }: CurrentIterationArguments): void => {
  if (currentNode.parent === null) {
    return;
  }
  currentNode.parent.appendChild(currentElement);
};

const setNextIterationArguments = (context: IterationContext): void => {
  const nextNode: WithParentTrait<Node.Any> | undefined = context.unprocessedNodes[0];
  if (nextNode === undefined) {
    return;
  }
  context.currentNode = nextNode;

  if (isWithTag(nextNode)) {
    context.currentElement = document.createElement(nextNode.tagName);
    return;
  }

  if (isWithInnerText(nextNode)) {
    context.currentElement = document.createTextNode(nextNode.innerText);
  }
};
