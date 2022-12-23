import type { Node } from './declarations/node.interface';
import type { WithAttributes } from './declarations/traits/with-attributes.trait';
import type { WithInnerText } from './declarations/traits/with-inner-text.trait';
import type { WithParent } from './declarations/traits/with-parent.trait';
import { isWithAttributes } from './type-guards/is-with-attributes.type-guard';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';

export class HierarchyBuilder {
  readonly #rootElement: HTMLElement;

  #currentNode: WithParent<Node.Any>;
  #currentElement: HTMLElement | Text;

  readonly #unprocessedNodes: WithParent<Node.Any>[] = [];

  constructor(rootNode: Node.WithChildren) {
    this.#rootElement = document.createElement(rootNode.tagName);
    this.#currentNode = HierarchyBuilder.#getNodeWithParent(rootNode, null);
    this.#currentElement = this.#rootElement;
  }

  public get result(): HTMLElement {
    return this.#rootElement;
  }

  private get nextNode(): WithParent<Node.Any> | undefined {
    return this.#unprocessedNodes[0];
  }

  public generate(): void {
    do {
      this.#applyAttributes();
      this.#insertTextContent();
      this.#unwrapChildren();
      this.#insertCurrentNodeIntoHierarchy();
      this.#setNextIterationArguments();
    } while (this.#unprocessedNodes.length !== 0);
  }

  #applyAttributes(): void {
    if (!isWithAttributes(this.#currentNode)) {
      return;
    }
    const { attributes }: WithAttributes = this.#currentNode;

    if (!(this.#currentElement instanceof HTMLElement)) {
      return;
    }
    const trustedCurrentElement: HTMLElement = this.#currentElement;

    Object.entries(attributes).forEach(([key, value]: [string, string]) => {
      trustedCurrentElement.setAttribute(key, value);
    });
  }

  #insertTextContent(): void {
    if (!isWithInnerText(this.#currentNode)) {
      return;
    }
    const { innerText }: WithInnerText = this.#currentNode;

    if (this.#currentElement instanceof Text) {
      this.#currentElement.nodeValue = innerText;
      return;
    }

    this.#currentElement.innerHTML = innerText;
  }

  #unwrapChildren(): void {
    const childrenToUnwrapWithParentRef: WithParent<Node.Any>[] =
      this.#currentElement instanceof HTMLElement
        ? HierarchyBuilder.#getChildrenWithParent(this.#currentNode, this.#currentElement)
        : [];
    this.#unprocessedNodes.splice(0, 1, ...childrenToUnwrapWithParentRef);
  }

  #insertCurrentNodeIntoHierarchy(): void {
    if (this.#currentNode.parent === null) {
      return;
    }
    this.#currentNode.parent.appendChild(this.#currentElement);
  }

  #setNextIterationArguments(): void {
    if (this.nextNode === undefined) {
      return;
    }
    const nextNode: WithParent<Node.Any> = this.nextNode;
    this.#currentNode = nextNode;

    if (isWithTag(nextNode)) {
      this.#currentElement = document.createElement(nextNode.tagName);
      return;
    }

    if (isWithInnerText(nextNode)) {
      this.#currentElement = document.createTextNode(nextNode.innerText);
    }
  }

  static #getNodeWithParent(node: Node.Any, parent: HTMLElement | null): WithParent<Node.Any> {
    const parentKey: keyof WithParent = 'parent';
    const propertyDescriptor: PropertyDescriptor = {
      value: parent,
      writable: false,
      enumerable: true,
      configurable: false,
    };
    return Object.create(node, {
      [parentKey]: propertyDescriptor,
    });
  }

  static #getChildrenWithParent(
    currentNode: WithParent<Node.Any>,
    currentElement: HTMLElement
  ): WithParent<Node.Any>[] {
    if (!isWithChildren(currentNode)) {
      return [];
    }

    return currentNode.children.map(
      (child: Node.Any): WithParent<Node.Any> => HierarchyBuilder.#getNodeWithParent(child, currentElement)
    );
  }
}
