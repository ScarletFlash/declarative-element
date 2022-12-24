import type { WithParentTrait } from '../traits/with-parent.trait';
import type { CurrentIterationArguments } from './current-iteration-arguments.interface';
import type { Node } from './node.interface';

export interface IterationContext extends CurrentIterationArguments {
  readonly unprocessedNodes: WithParentTrait<Node.Any>[];
}
