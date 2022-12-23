import type { Node } from './declarations/node.interface';
import { ElementTree } from './element-tree.class';

describe('element-tree.class.ts', () => {
  describe('ElementTree.getElement', () => {
    it('should handle root text nodes without any tag', () => {
      const rootNode: Node.Text = {
        innerText: 'node without any tag',
      };

      const resultDomEntry: HTMLElement | Text = ElementTree.getElement(rootNode);
      expect(resultDomEntry).toBeInstanceOf(Text);
      expect(resultDomEntry.data).toBe(rootNode.innerText);
    });

    it('should handle root text nodes with tag', () => {
      const rootNode: Node.TextWithTag = {
        innerText: 'node with tag',
        tagName: 'p',
      };

      const resultDomEntry: HTMLElement | Text = ElementTree.getElement(rootNode);
      expect(resultDomEntry).toBeInstanceOf(HTMLElement);
      expect(resultDomEntry.innerText).toBe(rootNode.innerText);
      expect(resultDomEntry.tagName.toLowerCase()).toBe(rootNode.tagName.toLowerCase());
    });

    it('should handle root nodes with tag', () => {
      const rootNode: Node.WithTag = {
        tagName: 'div',
      };

      const resultDomEntry: HTMLElement | Text = ElementTree.getElement(rootNode);
      expect(resultDomEntry).toBeInstanceOf(HTMLElement);
      expect(resultDomEntry.innerHTML).toBe('');
      expect(resultDomEntry.tagName.toLowerCase()).toBe(rootNode.tagName.toLowerCase());
    });

    it('should handle root nodes with unnested children', () => {
      const initalPhrase: string = 'Hello, World!';

      const rootNode: Node.WithChildren = {
        tagName: 'div',
        children: initalPhrase.split('').map((innerText: string): Node.Text => ({ innerText })),
      };

      const resultDomEntry: HTMLElement | Text = ElementTree.getElement(rootNode);
      expect(resultDomEntry.innerHTML).toMatch(initalPhrase);
    });

    it.only('should handle root nodes with nested children', () => {
      const rootNode: Node.WithChildren = {
        tagName: 'html',
        children: [
          {
            tagName: 'head',
            children: [
              {
                tagName: 'title',
                innerText: 'HTML Sample',
              },
            ],
          },
          {
            tagName: 'body',
            children: [
              {
                tagName: 'main',
                children: [
                  {
                    tagName: 'ul',
                    children: [
                      {
                        tagName: 'li',
                        innerText: 'First',
                      },
                      {
                        tagName: 'li',
                        innerText: 'Second',
                      },
                      {
                        tagName: 'li',
                        innerText: 'Third',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      const resultDomEntry: HTMLElement | Text = ElementTree.getElement(rootNode);
      expect(resultDomEntry.innerHTML).toMatch(
        '<head><title>HTML Sample</title></head><body><main><ul><li>First</li><li>Second</li><li>Third</li></ul></main></body>'
      );
    });

    it('should throw error if node type is unsupported', () => {
      expect(() => ElementTree.getElement(Object.create({}))).toThrowError();
    });
  });
});
