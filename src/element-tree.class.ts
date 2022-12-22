import type { Node } from "./declarations/node.interface";
import type { WithInnerText } from "./declarations/traits/with-inner-text.trait";
import { isWithInnerText } from "./type-guards/is-with-inner-text.type-guard";
import { isWithTag } from "./type-guards/is-with-tag.type-guard";

export class ElementTree {
  public static getElement(
    node: Node.TextWithTag | Node.WithTag | Node.WithChildren
  ): HTMLElement;
  public static getElement(node: Node.Text): Text;
  public static getElement(node: Node.Any): HTMLElement | Text {
    if (isWithInnerText(node)) {
      return ElementTree.#getTextNode(node);
    }

    throw new Error("Unsupported root node type");
  }

  static #getTextNode(node: WithInnerText<Node.Any>): HTMLElement | Text {
    const innerText: string = node.innerText;

    if (isWithTag(node)) {
      const element: HTMLElement = document.createElement(node.tagName);
      element.innerText = innerText;
      return element;
    }

    return document.createTextNode(innerText);
  }
}
