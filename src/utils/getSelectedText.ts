import { window } from 'vscode';
import { ExtensionConstants } from '../constants';

export const getSelectedText = () => {
  let editor = window.activeTextEditor;
  if (!editor) {
    window.showErrorMessage("Please open a file first and select some text.");
    return;
  }

  const selectionText = editor.document.getText(editor.selection);

  if (selectionText.length < 0 || selectionText.length > ExtensionConstants.maxChars) {
    window.showErrorMessage(`Please select a text between 1 and ${ExtensionConstants.maxChars} characters.`);
    return;
  }

  return selectionText;
}