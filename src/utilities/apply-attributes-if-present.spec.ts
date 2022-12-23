import type { Node } from './../declarations/node.interface';
import { applyAttributesIfPresent } from './apply-attributes-if-present';

describe('apply-attributes-if-present.ts', () => {
  it('should add attributes if they are defined', () => {
    const element: HTMLElement = document.createElement('p');
    const node: Node.WithTag = {
      tagName: 'p',
      attributes: {
        key: 'value',
      },
    };

    expect(element.attributes).toHaveLength(0);
    applyAttributesIfPresent(element, node);
    expect(element.attributes).toHaveLength(1);
    expect(element.getAttribute('key')).toBe('value');
  });

  it('should leave element as is if no attributes defined', () => {
    const element: HTMLElement = document.createElement('p');
    const node: Node.WithTag = {
      tagName: 'p',
    };

    expect(element.attributes).toHaveLength(0);
    applyAttributesIfPresent(element, node);
    expect(element.attributes).toHaveLength(0);
  });

  it('should leave element as is if it is not HTMLElement', () => {
    const element: Text = document.createTextNode('123');
    const node: Node.WithTag = {
      tagName: 'p',
      attributes: {
        key: 'value',
      },
    };

    const initialValue: string | null = element.nodeValue;
    applyAttributesIfPresent(element, node);
    const resultValue: string | null = element.nodeValue;

    expect(initialValue).toBe(resultValue);
  });
});
