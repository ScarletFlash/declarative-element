import type { Node } from "../node.interface";

export type WithChildren<T = unknown> = T & { children: Node.Any[] };
