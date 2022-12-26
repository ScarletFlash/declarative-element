import { editor } from 'monaco-editor';
import { getElement } from 'library';

const jsonEditorContainer: HTMLElement | null = document.querySelector('section.editor-json');
if (jsonEditorContainer === null) {
  throw new Error('JSON editor container is missing');
}

const jsonEditor: editor.IStandaloneCodeEditor = editor.create(jsonEditorContainer, {
  value: '',
  language: 'json',
});

const htmlEditorContainer: HTMLElement | null = document.querySelector('section.editor-html');
if (htmlEditorContainer === null) {
  throw new Error('HTML editor container is missing');
}

const htmlEditor: editor.IStandaloneCodeEditor = editor.create(htmlEditorContainer, {
  value: '',
  language: 'html',
  readOnly: true,
});

jsonEditor.onDidChangeModelContent(() => {
  const stringifiedValue: string = jsonEditor.getValue();
  const resultElement: HTMLElement | Text = getElement(JSON.parse(stringifiedValue));

  if (resultElement instanceof Text) {
    htmlEditor.setValue(resultElement.nodeValue ?? '');
    return;
  }

  htmlEditor.setValue(resultElement.outerHTML);
});
