# Element Tree

Lightweight, simple and reliable boilerplate wrapper for DOM-elements creation

> ⚠️ Raw implementation. Please, wait for 100% test coverage before production usage

## Installation

```bash
npm install declarative-element
```

## Usage

```javascript
import { DeclarativeElement } from 'declarative-element';

/** @type {import('declarative-element').Node.WithChildren} */
const input = {
  tagName: 'main',
  children: [
    {
      tagName: 'header',
      children: [
        {
          tagName: 'h1',
          innerText: 'HTML Sample',
        },
      ],
    },
    {
      tagName: 'section',
      children: [
        {
          tagName: 'p',
          innerText: 'Hello, World!',
        },
      ],
    },
  ],
};

const output = DeclarativeElement.getElement();
document.body.appendChild(output);
```
