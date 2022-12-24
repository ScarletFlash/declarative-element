import type { IterationContext } from '../declarations/interfaces/iteration-context.interface';
import type { Node } from '../declarations/interfaces/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { getEmptyElementByNode } from './get-empty-element-by-node.utility';

export const setNextIterationArguments = (context: IterationContext): void => {
  const nextNode: WithParentTrait<Node.Any> | undefined = context.unprocessedNodes[0];
  if (nextNode === undefined) {
    return;
  }
  context.node = nextNode;

  context.element = getEmptyElementByNode(nextNode);
};
