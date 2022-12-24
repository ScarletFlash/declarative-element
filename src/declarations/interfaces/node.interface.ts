import type { WithAttributesTrait } from '../traits/with-attributes.trait';
import type { WithChildrenTrait } from '../traits/with-children.trait';
import type { WithInnerTextTrait } from '../traits/with-inner-text.trait';
import type { WithTagNameTrait } from '../traits/with-tag-name.trait';

export namespace Node {
  export interface WithTag extends WithTagNameTrait, Partial<WithAttributesTrait> {}

  export interface WithChildren extends WithTag, WithChildrenTrait {}

  export type Text = WithInnerTextTrait;

  export interface TextWithTag extends WithTag, Text {}

  export type Any = WithTag | WithChildren | Text | TextWithTag;
}
