import { ProgressLocation, window } from "vscode";
import { AiService } from "../service";
import { getSelectedText, setSelectedText } from "../utils";


export class SeoOptimization {

  public static async optimize() {
    const selectionText = getSelectedText();
    if (!selectionText) {
      return;
    }

    if (selectionText.length < 0 || selectionText.length > 1000) {
      window.showErrorMessage("Please select a text between 1 and 1000 characters.");
      return;
    }

    let keywords = await window.showInputBox({
      title: "Enter keywords for SEO:",
      placeHolder: "Enter keywords (separated by commas)"
    });

    if (keywords) {
      keywords = keywords.trim();
    }

    if (!keywords || keywords.length < 0) {
      return;
    }

    window.withProgress({
      location: ProgressLocation.Notification,
      cancellable: false,
      title: "Sparkup ✨: SEO optimization processing..."
    }, async (progress, token) => {
      const result = await AiService.call("seo", selectionText, undefined, keywords);

      if (!result) {
        window.showErrorMessage("Something went wrong. Please try again.");
        return;
      }
      
      await setSelectedText(result);

      return;
    });
  }
}