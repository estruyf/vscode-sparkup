import { ProgressLocation, window } from "vscode";
import { AiService } from "../service";
import { getSelectedText, setSelectedText } from "../utils";

export class RevisionText {

  public static async revision() {
    const selectionText = getSelectedText();
    if (!selectionText) {
      return;
    }

    const intentTypes = ["Informative", "Descriptive", "Engaging", "Tells a story"];
    const audienceTypes = ["General", "Experts", "Marketing", "Sales", "Technical"];

    if (selectionText.length < 0 || selectionText.length > 1000) {
      window.showErrorMessage("Please select a text between 1 and 1000 characters.");
      return;
    }

    const intent = await window.showQuickPick(intentTypes, {
      canPickMany: false,
      title: "Select the intent for your text",
      placeHolder: "Select the intent"
    });

    if (!intent) {
      return;
    }

    const audience = await window.showQuickPick(audienceTypes, {
      canPickMany: false,
      title: "Select the audience for your text",
      placeHolder: "Select the audience"
    });

    if (intentTypes.includes(intent) && audience && audienceTypes.includes(audience)) {
      let instruction = ``;
      if (intent === "Informative") {
        instruction = `Rewrite the text to inform a ${audience} audience:`
      } else if (intent === "Descriptive") {
        instruction = `Rewrite the text to be descriptive for a ${audience} audience:`
      } else if (intent === "Engaging") {
        instruction = `Rewrite the text to be engaging for a ${audience} audience:`
      } else if (intent === "Tells a story") {
        instruction = `Rewrite the text to tell a story for a ${audience} audience:`
      }

      window.withProgress({
        location: ProgressLocation.Notification,
        cancellable: false,
        title: "Sparkup ✨: Generating revision..."
      }, async (progress, token) => {
        const result = await AiService.call("revision", selectionText, instruction);

        if (!result) {
          window.showErrorMessage("Something went wrong. Please try again.");
          return;
        }
        
        await setSelectedText(result);

        return;
      });
    }
  }
}