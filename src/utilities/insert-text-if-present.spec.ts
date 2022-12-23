import type { Node } from '../declarations/node.interface';
import { insertTextIfPresent } from './insert-text-if-present';

describe('insert-text-if-present.ts', () => {
  it('should leave element as is if no innerText difined', () => {
    const element: HTMLElement = document.createElement('p');
    const node: Node.WithTag = {
      tagName: 'p',
    };

    const initialHtml: string = element.outerHTML;
    insertTextIfPresent(element, node);
    const resultHtml: string = element.outerHTML;

    expect(initialHtml).toBe(resultHtml);
  });

  it('should insert text inside Text node', () => {
    const element: Text = document.createTextNode('123');
    const node: Node.Text = {
      innerText: '456',
    };

    const initailValue: string | null = element.nodeValue;
    insertTextIfPresent(element, node);
    const resultValue: string | null = element.nodeValue;

    expect(initailValue).toBe('123');
    expect(resultValue).toBe('456');
  });

  it('should insert text inside HTMLElement node', () => {
    const element: HTMLElement = document.createElement('p');
    const node: Node.TextWithTag = {
      tagName: 'p',
      innerText: 'We are the champions',
    };

    const initailValue: string = element.innerHTML;
    insertTextIfPresent(element, node);
    const resultValue: string = element.innerHTML;

    expect(initailValue).toBe('');
    expect(resultValue).toBe('We are the champions');
  });
});
