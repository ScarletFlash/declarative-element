import type { Node } from './declarations/node.interface';
import { HierarchyBuilder } from './hierarchy-builder.class';

describe('hierarchy-builder.class.ts', () => {
  it('should build HTMLElement for Node.WithChildren', () => {
    const root: Node.WithChildren = {
      tagName: 'svg',
      children: [],
    };

    const builder: HierarchyBuilder = new HierarchyBuilder(root);
    builder.generate();

    expect(builder.result).toBeInstanceOf(HTMLElement);
    expect(builder.result.tagName.toLowerCase()).toBe(root.tagName.toLowerCase());
  });

  it('should build HTMLElement for Node.WithChildren', () => {
    const root: Node.WithChildren = {
      tagName: 'svg',
      children: [],
    };

    const builder: HierarchyBuilder = new HierarchyBuilder(root);
    builder.generate();

    expect(builder.result).toBeInstanceOf(HTMLElement);
    expect(builder.result.tagName.toLowerCase()).toBe(root.tagName.toLowerCase());
  });

  it('should apply attributes to result', () => {
    const root: Node.WithChildren = {
      tagName: 'svg',
      children: [],
      attributes: {
        key1: 'value1',
        key2: 'value2',
      },
    };

    const builder: HierarchyBuilder = new HierarchyBuilder(root);
    builder.generate();

    expect(builder.result).toBeInstanceOf(HTMLElement);
    expect(builder.result.getAttribute('key1')).toBe('value1');
    expect(builder.result.getAttribute('key2')).toBe('value2');
  });

  it('should build flat HTMLElement if it has no children', () => {
    const root: Node.WithChildren = {
      tagName: 'div',
      children: [],
    };

    const builder: HierarchyBuilder = new HierarchyBuilder(root);
    builder.generate();

    expect(builder.result).toHaveProperty('outerHTML', '<div></div>');
  });

  it('should build HTMLElement with nested Elements if it has children', () => {
    const root: Node.WithChildren = {
      tagName: 'div',
      children: [
        {
          tagName: 'span',
          children: [
            {
              innerText: 'A',
            },
            {
              innerText: 'B',
            },
            {
              innerText: 'C',
            },
          ],
        },
      ],
    };

    const builder: HierarchyBuilder = new HierarchyBuilder(root);
    builder.generate();

    expect(builder.result).toHaveProperty('outerHTML', '<div><span>ABC</span></div>');
  });
});
