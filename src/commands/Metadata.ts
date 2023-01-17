import { ProgressLocation, window, Uri } from "vscode";
import { SparkupContentProvider } from "../provider";
import { AiService } from "../service";
import { createDocument, getSelectedText } from "../utils";

export class Metadata {

  public static async process() {
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

      const uri = Uri.parse(`${SparkupContentProvider.scheme}:Sparkup ✨ - Categories & Tags`);

      const result = await AiService.call("categorization", selectionText, undefined, undefined);

      if (!result) {
        window.showErrorMessage("Something went wrong. Please try again.");
        return;
      }
      
      // Remove start and end quotes
      const { categories, tags } = result;
      if ((categories && categories.length > 0) || (tags && tags.length > 0)) {

        let taggedContent = [];
        
        if (categories && categories.length > 0) {
          taggedContent.push(`## Categories\n\n`);
          categories.forEach((category: string) => {
            taggedContent.push(`- ${category}\n`);
          });
          taggedContent.push(`\n`);
        }

        if (tags && tags.length > 0) {
          taggedContent.push(`## Tags\n\n`);
          tags.forEach((tag: string) => {
            taggedContent.push(`- ${tag}\n`);
          });
          taggedContent.push(`\n`);
        }

        const content = `# Sparkup - Categories & Tags

${taggedContent.join('')}
        `;

        const language = window.activeTextEditor?.document.languageId || 'markdown';

        await createDocument(uri, language, content);
      } else {
        window.showWarningMessage(`Sparkup ✨: We couldn't generate categories & tags for you. Please try again.`);
      }

      return;
    });
  }
}