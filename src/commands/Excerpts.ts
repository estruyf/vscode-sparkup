import { ProgressLocation, Uri, window } from "vscode";
import { SparkupContentProvider } from "../provider";
import { AiService } from "../service";
import { createDocument, getSelectedText } from "../utils";


export class Excerpts {

  public static process() {
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
      const result = await AiService.call("excerpts", selectionText, undefined, undefined);

      if (!result) {
        window.showErrorMessage("Something went wrong. Please try again.");
        return;
      }
      
      // Remove start and end quotes
      const values = result || [];
      if (values && values.length > 0) {

        const uri = Uri.parse(`${SparkupContentProvider.scheme}:Sparkup ✨ - Excerpts`);

        const content = `# Sparkup - Excerpts
${values.map((value: string, idx: number) => `
## Excerpt ${idx + 1}

${value}
`).join('')}`;

        const language = window.activeTextEditor?.document.languageId || 'markdown';

        await createDocument(uri, language, content);
      } else {
        window.showWarningMessage("Sparkup ✨: We couldn't generate a headline for you. Please try again.");
      }

      return;
    });
  }
}