import { editor } from 'monaco-editor';

const jsonEditorContainer: HTMLElement | null = document.querySelector('section.editor-json');
if (jsonEditorContainer === null) {
  throw new Error('JSON editor container is missing');
}

editor.create(jsonEditorContainer, {
  value: "function hello() {\n\talert('Hello world 1!');\n}",
  language: 'javascript',
});

const htmlEditorContainer: HTMLElement | null = document.querySelector('section.editor-html');
if (htmlEditorContainer === null) {
  throw new Error('HTML editor container is missing');
}

editor.create(jsonEditorContainer, {
  value: "function hello() {\n\talert('Hello world 2!');\n}",
  language: 'javascript',
});
