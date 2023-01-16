import { languages, Position, Range, Uri, ViewColumn, window, workspace, WorkspaceEdit } from "vscode";


export const createDocument = async (uri: Uri, language: string, text: string) => {

  const doc = await workspace.openTextDocument(uri);
  await window.showTextDocument(doc, { preview: false, viewColumn: ViewColumn.Beside });
  await languages.setTextDocumentLanguage(doc, language);

  const lines = doc.lineCount;
  const edit = new WorkspaceEdit();

  if (lines > 0) {
    edit.replace(uri, new Range(new Position(0, 0), new Position(lines, 0)), text);
  } else {
    edit.insert(uri, new Position(0, 0), text);
  }
  await workspace.applyEdit(edit);
}