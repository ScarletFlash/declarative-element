import type { IterationContext } from '../declarations/interfaces/iteration-context.interface';
import type { Node } from '../declarations/interfaces/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { applyAttributesIfPresent } from './apply-attributes-if-present.utility';
import { getNodeWithParent } from './get-node-with-parent.utility';
import { insertCurrentNodeIntoHierarchy } from './insert-current-node-into-hierarchy.utility';
import { insertTextIfPresent } from './insert-text-if-present.utility';
import { setNextIterationArguments } from './set-next-iteration-arguments.utility';
import { unwrapChildren } from './unwrap-children.utility';

export const getHierarchy = (rootNode: Node.WithChildren): HTMLElement => {
  const rootElement: HTMLElement = document.createElement(rootNode.tagName);
  const rootNodeWithParent: WithParentTrait<Node.Any> = getNodeWithParent(rootNode, null);
  const unprocessedNodes: WithParentTrait<Node.Any>[] = [rootNodeWithParent];
  const context: IterationContext = {
    unprocessedNodes,
    node: rootNodeWithParent,
    element: rootElement,
  };

  do {
    applyAttributesIfPresent(context);
    insertTextIfPresent(context);
    unwrapChildren(context);
    insertCurrentNodeIntoHierarchy(context);
    setNextIterationArguments(context);
  } while (unprocessedNodes.length !== 0);

  return rootElement;
};
