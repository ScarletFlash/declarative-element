import type { Node } from './node.interface';

export interface NodeWithElement {
  element: HTMLElement | Text;
  node: Node.Any;
}
