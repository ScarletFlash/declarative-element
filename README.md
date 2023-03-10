# Declarative Element

<div align="center">

<a href="https://github.com/ScarletFlash/declarative-element/actions/workflows/on-push.yaml">![CI](https://github.com/ScarletFlash/declarative-element/actions/workflows/on-push.yaml/badge.svg)</a>
<a href="https://github.com/ScarletFlash/declarative-element/blob/main/projects/library/jest.config.ts#L22">![Code Coverage](https://img.shields.io/badge/code--coverage-100%25-green)</a>
<a href="https://github.com/ScarletFlash/declarative-element/search?l=typescript">![Type Definitions](https://img.shields.io/npm/types/declarative-element)</a>
<a href="https://github.com/ScarletFlash/declarative-element/blob/main/LICENSE.md">![NPM License](https://img.shields.io/npm/l/declarative-element)</a>

</div>

Lightweight, simple and reliable boilerplate wrapper for DOM-elements creation

- TypeScript API — nothing is written in pure JS
- Optimized for smaller bundle size — manually + minified by ESBuild
- Covered by tests
- SemVer versioning
- ~~Online demo and query constructor~~ TBA

## Installation

```bash
npm install declarative-element@latest
```

## Usage

```javascript
import { getElement } from 'declarative-element';

/** @type {import('declarative-element').Node.WithChildren} */
const input = {
  tagName: 'main',
  children: [
    {
      tagName: 'header',
      children: [{ tagName: 'h1', innerText: 'HTML Sample' }],
    },
    {
      tagName: 'section',
      children: [{ tagName: 'p', innerText: 'Hello, World!' }],
    },
  ],
};

const output = getElement(input);
document.body.appendChild(output);
```

## Samples

<table>
<tr>
  <td>JSON</td>
  <td>HTML</td>
  <td>JS</td>
</tr>

<tr>
<td>

```json
    { "tagName": "div", "attributes": { "class": "square" } }
```

</td>
<td>

```html
<div class="square"></div>
```

</td>
<td>

```javascript
const element = document.createElement('div');
element.classList.add('square');
```

</td>
</tr>

<tr>
<td>

```json
    { "tagName": "p", "innerText": "Hello, World!" }
```

</td>
<td>

```html
<p>Hello, World!</p>
```

</td>
<td>

```javascript
const element = document.createElement('p');
element.innerHTML = 'Hello, World!';
```

</td>
</tr>

<tr>
<td>

```json
    {
      "tagName": "a",
      "children": [{ "tagName": "button", "innerText": "Subscribe" }]
    }
```

</td>
<td>

```html
<a>
  <button>Subscribe</button>
</a>
```

</td>
<td>

```javascript
const buttonElement = document.createElement('button');
element.innerHTML = 'Subscribe';

const anchorElement = document.createElement('a');
anchorElement.appendChild(buttonElement);
```

</td>
</tr>

<tr>
<td>

```json
    {
      "tagName": "html",
      "children": [
        {
          "tagName": "head",
          "children": [{ "tagName": "title", "innerText": "Sample" }]
        },
        {
          "tagName": "body",
          "children": [
            { "tagName": "header" },
            { "tagName": "main" },
            { "tagName": "footer" }
          ]
        }
      ]
    }
```

</td>
<td>

```html
<html>
  <head>
    <title>Sample</title>
  </head>

  <body>
    <header></header>

    <main></main>

    <footer></footer>
  </body>
</html>
```

</td>
<td>

```javascript
const titleElement = document.createElement('title');
titleElement.innerHTML = 'Sample';

const headElement = document.createElement('head');
headElement.appendChild(titleElement);

const headerElement = document.createElement('header');

const mainElement = document.createElement('main');

const footerElement = document.createElement('footer');

const bodyElement = document.createElement('body');
bodyElement.appendChild(headerElement);
bodyElement.appendChild(mainElement);
bodyElement.appendChild(footerElement);

const htmlElement = document.createElement('html');
htmlElement.appendChild(headElement);
htmlElement.appendChild(bodyElement);
```

</td>
</tr>

</table>
