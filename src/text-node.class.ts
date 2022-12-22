import type { Node } from "./declarations/node.interface";
import type { WithInnerText } from "./declarations/traits/with-inner-text.trait";

export class TextNode {
  public readonly view: Text | HTMLElement;

  constructor(innerText: string, tag?: string) {
    if (tag === undefined) {
      this.view = document.createTextNode(innerText);
      return;
    }

    this.view = document.createElement(tag);
    this.view.innerText = innerText;
  }
}
