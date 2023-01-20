import { ProgressLocation, window, Uri } from "vscode";
import { SparkupContentProvider } from "../provider";
import { AiService } from "../service";
import { createDocument, getSelectedText } from "../utils";


export class Headline {

  public static async generate() {
    const selectionText = getSelectedText();
    if (!selectionText) {
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

        const language = window.activeTextEditor?.document.languageId || 'markdown';

        await createDocument(uri, language, content);
      } else {
        window.showWarningMessage("Sparkup ✨: We couldn't generate a headline for you. Please try again.");
      }

      return;
    });
  }
}