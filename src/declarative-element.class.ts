import type { Node } from './declarations/node.interface';
import type { WithInnerTextTrait } from './declarations/traits/with-inner-text.trait';
import { HierarchyBuilder } from './hierarchy-builder.class';
import { isWithAttributes } from './type-guards/is-with-attributes.type-guard';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';

export class DeclarativeElement {
  public static getElement(node: Node.TextWithTag | Node.WithTag | Node.WithChildren): HTMLElement;
  public static getElement(node: Node.Text): Text;
  public static getElement(node: Node.Any): HTMLElement | Text {
    if (isWithInnerText(node)) {
      return DeclarativeElement.#getTextNode(node);
    }

    if (isWithChildren(node)) {
      return DeclarativeElement.#getTaggedNodeWithChildren(node);
    }

    if (isWithTag(node)) {
      return DeclarativeElement.#getTaggedNodeWithoutChildren(node);
    }

    throw new Error('Unsupported root node type');
  }

  static #getTextNode(node: WithInnerTextTrait<Node.Any>): HTMLElement | Text {
    const innerText: string = node.innerText;

    if (isWithTag(node)) {
      const element: HTMLElement = document.createElement(node.tagName);
      element.innerText = innerText;
      return element;
    }

    return document.createTextNode(innerText);
  }

  static #getTaggedNodeWithoutChildren(node: Node.WithChildren): never;
  static #getTaggedNodeWithoutChildren(node: Node.WithTag): HTMLElement;
  static #getTaggedNodeWithoutChildren(node: Node.WithTag): HTMLElement {
    const element: HTMLElement = document.createElement(node.tagName);
    DeclarativeElement.#applyAttributesIfPresent(node, element);
    return element;
  }

  static #getTaggedNodeWithChildren(rootNode: Node.WithChildren): HTMLElement {
    const builder: HierarchyBuilder = new HierarchyBuilder(rootNode);
    builder.generate();
    return builder.result;
  }

  static #applyAttributesIfPresent(node: Node.WithTag, element: HTMLElement): void {
    if (!isWithAttributes(node)) {
      return;
    }

    Object.entries(node.attributes).forEach(([key, value]: [string, string]) => {
      element.setAttribute(key, value);
    });
  }
}
