import { window } from 'vscode';

export const setSelectedText = async (text?: string) => {
  let editor = window.activeTextEditor;
  const selection = editor?.selection;
  if (selection && text) {
    await editor?.edit(builder => {
      builder.replace(selection, text);            
    });
  }
}