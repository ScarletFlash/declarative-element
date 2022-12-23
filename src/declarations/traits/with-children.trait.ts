import type { Node } from '../node.interface';

export type WithChildrenTrait<T = unknown> = T & { children: Node.Any[] };
