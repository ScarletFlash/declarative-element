import type { Node } from './declarations/interfaces/node.interface';
import type { WithInnerTextTrait } from './declarations/traits/with-inner-text.trait';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './utilities/apply-attributes-if-present.utility';
import { getEmptyElementByNode } from './utilities/get-empty-element-by-node.utility';
import { getHierarchy } from './utilities/get-hierarchy.utility';
import { insertTextIfPresent } from './utilities/insert-text-if-present.utility';

/**
 * @param node - HTMLElement.
 *
 * ---.
 * @access public
 *
 * ---
 * @example
 * ### Usage:
 * ```javascript
 * const textNodeWithTag = getElement({
 *   innerText: 'Lorem ipsum dolor sit amet',
 *   tagName: 'p'
 * });
 *
 * div.appendChild(textNodeWithTag);
 * ```
 *
 * ### Result HTML:
 * ```html
 * <div>
 *   <p>Lorem ipsum dolor sit amet</p>
 * </div>
 * ```
 *
 * ---
 * @returns Returns HTMLElement.
 */
export function getElement(node: Node.TextWithTag): HTMLElement;

/**
 * @param node - Text node declaration.
 *
 * ---.
 * @access public
 *
 * ---
 * @example
 * ### Usage:
 * ```javascript
 * const textNode = getElement({
 *   innerText: 'Lorem ipsum dolor sit amet'
 * });
 *
 * div.appendChild(textNode);
 * ```
 *
 * ### Result HTML:
 * ```html
 * <div>Lorem ipsum dolor sit amet</div>
 * ```
 *
 * ---
 * @returns Returns Text node.
 */
export function getElement(node: Node.Text): Text;

/**
 * @param node - HTMLElement.
 *
 * ---.
 * @access public
 *
 * ---
 * @example
 * ### Usage:
 * ```javascript
 * const nodeWithChildren = getElement({
 *   tagName: 'p',
 *   children: [
 *     { tagName: 'span', innerText: 'Lorem ipsum ' },
 *     {
 *       tagName: 'strong',
 *       children: [
 *         { innerText: 'dolor ' },
 *         { innerText: 'sit ' },
 *         { innerText: 'amet' },
 *       ]
 *     }
 *   ]
 * });
 *
 * div.appendChild(nodeWithChildren);
 * ```
 *
 * ### Result HTML:
 * ```html
 * <div>
 *   <span>
 *     Lorem ipsum
 *     <strong>dolor sit amet</strong>
 *   </span>
 * </div>
 * ```
 *
 * ---
 * @returns Returns HTMLElement.
 */
export function getElement(node: Node.WithChildren): HTMLElement;

/**
 * @param node - HTMLElement.
 *
 * ---.
 * @access public
 *
 * ---
 * @example
 * ### Usage:
 * ```javascript
 * const nodeWithTag = getElement({
 *   tagName: 'img'
 * });
 *
 * div.appendChild(nodeWithTag);
 * ```
 *
 * ### Result HTML:
 * ```html
 * <div>
 *   <img>
 * </div>
 * ```
 *
 * ---
 * @returns Returns HTMLElement.
 */
export function getElement(node: Node.WithTag): HTMLElement;
export function getElement(node: Node.Any): HTMLElement | Text {
  if (isWithInnerText(node)) {
    return getTextNode(node);
  }

  if (isWithChildren(node)) {
    return getHierarchy(node);
  }

  if (isWithTag(node)) {
    return getTaggedNodeWithoutChildren(node);
  }

  throw new Error('Unsupported root node type');
}

const getTextNode = (node: WithInnerTextTrait<Node.Any>): Text => {
  const element: Text = getEmptyElementByNode(node);
  insertTextIfPresent({ element, node });
  return element;
};

const getTaggedNodeWithoutChildren = (node: Node.WithTag): HTMLElement => {
  const element: HTMLElement = getEmptyElementByNode(node);
  applyAttributesIfPresent({ element, node });
  return element;
};
