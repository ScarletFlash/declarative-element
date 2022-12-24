import type { WithParentTrait } from '../traits/with-parent.trait';
import type { NodeWithElement } from './node-with-element.interface';
import type { Node } from './node.interface';

export interface CurrentIterationArguments extends NodeWithElement {
  node: WithParentTrait<Node.Any>;
  element: HTMLElement | Text;
}
