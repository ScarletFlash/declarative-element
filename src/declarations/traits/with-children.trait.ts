import type { Node } from '../interfaces/node.interface';

export type WithChildrenTrait<T = unknown> = T & { children: Node.Any[] };
