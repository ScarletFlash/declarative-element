import type { Node } from './declarations/node.interface';
import type { WithInnerTextTrait } from './declarations/traits/with-inner-text.trait';
import { HierarchyBuilder } from './hierarchy-builder.class';
import { isWithChildren } from './type-guards/is-with-children.type-guard';
import { isWithInnerText } from './type-guards/is-with-inner-text.type-guard';
import { isWithTag } from './type-guards/is-with-tag.type-guard';
import { applyAttributesIfPresent } from './utilities/apply-attributes-if-present';
import { insertTextIfPresent } from './utilities/insert-text-if-present';

export class DeclarativeElement {
  public static getElement(node: Node.TextWithTag | Node.WithTag | Node.WithChildren): HTMLElement;
  public static getElement(node: Node.Text): Text;
  public static getElement(node: Node.Any): HTMLElement | Text {
    if (isWithInnerText(node)) {
      return DeclarativeElement.getTextNode(node);
    }

    if (isWithChildren(node)) {
      return DeclarativeElement.getTaggedNodeWithChildren(node);
    }

    if (isWithTag(node)) {
      return DeclarativeElement.getTaggedNodeWithoutChildren(node);
    }

    throw new Error('Unsupported root node type');
  }

  private static getTextNode(node: WithInnerTextTrait<Node.Any>): HTMLElement | Text {
    const element: HTMLElement | Text = isWithTag(node)
      ? document.createElement(node.tagName)
      : document.createTextNode('');
    insertTextIfPresent(element, node);
    return element;
  }

  private static getTaggedNodeWithoutChildren(node: Node.WithChildren): never;
  private static getTaggedNodeWithoutChildren(node: Node.WithTag): HTMLElement;
  private static getTaggedNodeWithoutChildren(node: Node.WithTag): HTMLElement {
    const element: HTMLElement = document.createElement(node.tagName);
    applyAttributesIfPresent(element, node);
    return element;
  }

  private static getTaggedNodeWithChildren(rootNode: Node.WithChildren): HTMLElement {
    const builder: HierarchyBuilder = new HierarchyBuilder(rootNode);
    builder.generate();
    return builder.result;
  }
}
