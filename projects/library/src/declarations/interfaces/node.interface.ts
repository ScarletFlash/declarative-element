import type { WithAttributesTrait } from '../traits/with-attributes.trait';
import type { WithChildrenTrait } from '../traits/with-children.trait';
import type { WithInnerTextTrait } from '../traits/with-inner-text.trait';
import type { WithTagNameTrait } from '../traits/with-tag-name.trait';

export namespace Node {
  /**
   * @example
   * ### Usage:
   * ```javascript
   * {
   *   tagName: 'div',
   *   attributes: {
   *     class: 'container'
   *   }
   * }
   * ```
   *
   * ### Result HTML:
   * ```html
   * <div class="container"></div>
   * ```
   */
  export interface WithTag extends WithTagNameTrait, Partial<WithAttributesTrait> {}

  /**
   * @example
   * ### Usage:
   * ```javascript
   * {
   *   tagName: 'section',
   *   children: [
   *     { tagName: 'div' },
   *     { tagName: 'div' },
   *     { tagName: 'div' }
   *   ]
   * }
   * ```
   *
   * ### Result HTML:
   * ```html
   * <section>
   *   <div></div>
   *   <div></div>
   *   <div></div>
   * </section>
   * ```
   */
  export interface WithChildren extends WithTag, WithChildrenTrait {}

  /**
   * @example
   * ### Usage:
   * ```javascript
   * {
   *   innerText: 'Who is John Galt?'
   * }
   * ```
   *
   * ### Result HTML:
   * ```html
   * Who is John Galt?
   * ```
   */
  export type Text = WithInnerTextTrait;

  /**
   * @example
   * ### Usage:
   * ```javascript
   * {
   *   tagName: 'a',
   *   attributes: {
   *     href: 'https://en.wikipedia.org/wiki/John_Galt'
   *   },
   *   innerText: 'Who is John Galt?'
   * }
   * ```
   *
   * ### Result HTML:
   * ```html
   * <a href="https://en.wikipedia.org/wiki/John_Galt">Who is John Galt?</a>
   * ```
   */
  export interface TextWithTag extends WithTag, Text {}

  /**
   * @description
   * Describes Node with unknown internal structure
   *
   * **Better use:**
   * - Node.WithTag
   * - Node.WithChildren
   * - Node.Text
   * - Node.TextWithTag
   */
  export type Any = WithTag | WithChildren | Text | TextWithTag;
}
