import { ProgressLocation, window, Uri, workspace, ViewColumn, languages } from "vscode";
import { SparkupContentProvider } from "../provider";
import { AiService } from "../service";
import { getSelectedText } from "../utils";


export class headline {

  public static async generate() {
    const selectionText = getSelectedText();
    if (!selectionText) {
      return;
    }

    if (selectionText.length < 0 || selectionText.length > 1000) {
      window.showErrorMessage("Please select a text between 1 and 1000 characters.");
      return;
    }

    window.withProgress({
      location: ProgressLocation.Notification,
      cancellable: false,
      title: "Sparkup ✨: Processing..."
    }, async (progress, token) => {
      const result = await AiService.call("headline", selectionText, undefined, undefined);

      if (!result) {
        window.showErrorMessage("Something went wrong. Please try again.");
        return;
      }
      
      // Remove start and end quotes
      const headlines = result || {};
      if (headlines && headlines.length > 0) {

        const uri = Uri.parse(`${SparkupContentProvider.scheme}:Sparkup ✨ - Headlines`);

        const content = `# Sparkup - Headlines

${headlines.map((headline: string, idx: number) => `${idx+1}. ${headline}`).join("\n")}
        `;
        SparkupContentProvider.contentToDisplay = content;

        const language = window.activeTextEditor?.document.languageId || 'markdown';

        const doc = await workspace.openTextDocument(uri);
        await window.showTextDocument(doc, { preview: false, viewColumn: ViewColumn.Beside });
        await languages.setTextDocumentLanguage(doc, language);

        SparkupContentProvider.contentToDisplay = '';
      } else {
        window.showWarningMessage("Sparkup ✨: We couldn't generate a headline for you. Please try again.");
      }

      return;
    });
  }
}