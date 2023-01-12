import { ProgressLocation, window } from "vscode";
import { AiService, IntendType } from "../service";
import { getSelectedText, setSelectedText } from "../utils";


export class TextEdits {

  public static async fixSpelling() {
    await TextEdits.edit("spelling", "Fix only the spelling mistakes in the text")
  }

  public static async biasFreeLanguage() {
    await TextEdits.edit("biasfree", "Edit the text to use bias-free language to make sure that it doesn't use he, him, his, she, her, or hers. For example, you can use plural noun and prenoun.")
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

  public static async edit(type: IntendType, instruction: string) {
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
      title: "Sparkup ✨: SEO optimization processing..."
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