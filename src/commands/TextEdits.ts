import { ProgressLocation, window } from "vscode";
import { AiService, IntentType } from "../service";
import { getSelectedText, setSelectedText } from "../utils";


export class TextEdits {

  public static async fixSpelling() {
    await TextEdits.edit("spelling")
  }

  public static async biasFreeLanguage() {
    await TextEdits.edit("biasfree")
  }

  public static async simplify() {
    await TextEdits.edit("simplify")
  }

  public static async freeform() {
    const answer = await window.showInputBox({
      prompt: "How do you want us to edit your text?",
      placeHolder: "Pass us your instruction here...",
    });

    if (!answer) {
      return;
    }

    await TextEdits.edit("freeform", answer)
  }

  public static async edit(type: IntentType, instruction?: string) {
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
      const result = await AiService.call(type, selectionText, instruction);

      if (!result) {
        window.showErrorMessage("Something went wrong. Please try again.");
        return;
      }
      
      await setSelectedText(result);

      return;
    });
  } 
}