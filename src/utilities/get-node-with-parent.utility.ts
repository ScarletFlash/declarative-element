import type { Node } from '../declarations/interfaces/node.interface';
import type { WithParentTrait } from '../declarations/traits/with-parent.trait';

export const getNodeWithParent = (node: Node.Any, parent: HTMLElement | null): WithParentTrait<Node.Any> => {
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
