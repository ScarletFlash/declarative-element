import type { Node } from './declarations/node.interface';
import type { WithParentTrait } from './declarations/traits/with-parent.trait';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './utilities/apply-attributes-if-present';
import { insertTextIfPresent } from './utilities/insert-text-if-present';

export class HierarchyBuilder {
  private readonly rootElement: HTMLElement;

  private currentNode: WithParentTrait<Node.Any>;
  private currentElement: HTMLElement | Text;

  private readonly unprocessedNodes: WithParentTrait<Node.Any>[];

  constructor(rootNode: Node.WithChildren) {
    this.rootElement = document.createElement(rootNode.tagName);
    this.currentNode = HierarchyBuilder.getNodeWithParent(rootNode, null);
    this.currentElement = this.rootElement;
    this.unprocessedNodes = [this.currentNode];
  }

  public get result(): HTMLElement {
    return this.rootElement;
  }

  private get nextNode(): WithParentTrait<Node.Any> | undefined {
    return this.unprocessedNodes[0];
  }

  private get currentElementChildrenWithParentRef(): WithParentTrait<Node.Any>[] {
    if (this.currentElement instanceof HTMLElement) {
      return HierarchyBuilder.getChildrenWithParent(this.currentNode, this.currentElement);
    }

    return [];
  }

  private static getNodeWithParent(node: Node.Any, parent: HTMLElement | null): WithParentTrait<Node.Any> {
    const parentKey: keyof WithParentTrait = 'parent';
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

  private static getChildrenWithParent(
    currentNode: WithParentTrait<Node.Any>,
    currentElement: HTMLElement
  ): WithParentTrait<Node.Any>[] {
    if (!isWithChildren(currentNode)) {
      return [];
    }

    return currentNode.children.map(
      (child: Node.Any): WithParentTrait<Node.Any> => HierarchyBuilder.getNodeWithParent(child, currentElement)
    );
  }

  public generate(): void {
    do {
      applyAttributesIfPresent(this.currentElement, this.currentNode);
      insertTextIfPresent(this.currentElement, this.currentNode);

      this.unwrapChildren();
      this.insertCurrentNodeIntoHierarchy();
      this.setNextIterationArguments();
    } while (this.unprocessedNodes.length !== 0);
  }

  private unwrapChildren(): void {
    this.unprocessedNodes.splice(0, 1, ...this.currentElementChildrenWithParentRef);
  }

  private insertCurrentNodeIntoHierarchy(): void {
    if (this.currentNode.parent === null) {
      return;
    }
    this.currentNode.parent.appendChild(this.currentElement);
  }

  private setNextIterationArguments(): void {
    if (this.nextNode === undefined) {
      return;
    }
    const nextNode: WithParentTrait<Node.Any> = this.nextNode;
    this.currentNode = nextNode;

    if (isWithTag(nextNode)) {
      this.currentElement = document.createElement(nextNode.tagName);
      return;
    }

    if (isWithInnerText(nextNode)) {
      this.currentElement = document.createTextNode(nextNode.innerText);
    }
  }
}
