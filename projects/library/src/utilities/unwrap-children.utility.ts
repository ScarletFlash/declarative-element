import type { IterationContext } from '../declarations/interfaces/iteration-context.interface';
import type { Node } from '../declarations/interfaces/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { isHtmlElement } from '../type-guards/is-html-element.type-guard';
import { getChildrenWithParent } from './get-children-with-parent.utility';

export const unwrapChildren = ({ element, node, unprocessedNodes }: IterationContext): void => {
  const childrenToInsert: WithParentTrait<Node.Any>[] = isHtmlElement(element)
    ? getChildrenWithParent(node, element)
    : [];

  unprocessedNodes.splice(0, 1, ...childrenToInsert);
};
