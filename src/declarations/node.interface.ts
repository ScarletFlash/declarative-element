import type { WithAttributes } from "./traits/with-attributes.trait";
import type { WithTagName } from "./traits/with-tag-name.trait";
import type { WithChildren as WithChildrenTrait } from "./traits/with-children.trait";
import type { WithInnerText } from "./traits/with-inner-text.trait";

export namespace Node {
  export interface WithTag extends WithTagName, Partial<WithAttributes> {}

  export interface WithChildren extends WithTag, WithChildrenTrait {}

  export interface Text extends WithInnerText {}

  export interface TextWithTag extends WithTag, Text {}

  export type Any = WithTag | WithChildren | Text | TextWithTag;
}
