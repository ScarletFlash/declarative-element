import type { CurrentIterationArguments } from '../declarations/interfaces/current-iteration-arguments.interface';

export const insertCurrentNodeIntoHierarchy = ({ element, node }: CurrentIterationArguments): void => {
  if (node.parent === null) {
    return;
  }
  node.parent.appendChild(element);
};
