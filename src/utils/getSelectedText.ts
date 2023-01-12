import { window } from 'vscode';

export const getSelectedText = () => {
  let editor = window.activeTextEditor;
  if (!editor) {
    window.showErrorMessage("Please open a file first and select some text.");
    return;
  }

  const selectionText = editor.document.getText(editor.selection);
  return selectionText;
}