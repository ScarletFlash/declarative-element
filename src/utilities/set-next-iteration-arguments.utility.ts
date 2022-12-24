import type { IterationContext } from '../declarations/interfaces/iteration-context.interface';
import type { Node } from '../declarations/interfaces/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { isWithInnerText } from '../type-guards/is-with-inner-text.type-guard';
import { isWithTag } from '../type-guards/is-with-tag.type-guard';

export const setNextIterationArguments = (context: IterationContext): void => {
  const nextNode: WithParentTrait<Node.Any> | undefined = context.unprocessedNodes[0];
  if (nextNode === undefined) {
    return;
  }
  context.node = nextNode;

  if (isWithTag(nextNode)) {
    context.element = document.createElement(nextNode.tagName);
    return;
  }

  if (isWithInnerText(nextNode)) {
    context.element = document.createTextNode(nextNode.innerText);
  }
};
