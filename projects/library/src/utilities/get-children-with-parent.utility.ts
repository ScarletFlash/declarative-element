import type { Node } from '../declarations/interfaces/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';
import { isWithChildren } from '../type-guards/is-with-children.type-guard';
import { getNodeWithParent } from './get-node-with-parent.utility';

export const getChildrenWithParent = (
  node: WithParentTrait<Node.Any>,
  parent: HTMLElement
): WithParentTrait<Node.Any>[] => {
  if (!isWithChildren(node)) {
    return [];
  }
  return node.children.map((child: Node.Any): WithParentTrait<Node.Any> => getNodeWithParent(child, parent));
};
