import { ProgressLocation, Uri, window, workspace } from "vscode";
import { FreeformInstruction } from "../models";
import { SparkupContentProvider } from "../provider";
import { AiService } from "../service";
import { createDocument, getSelectedText } from "../utils";


export class Freeform {

  public static getInstructions() {
    const config = workspace.getConfiguration("sparkup");
    const instructions = config.get<FreeformInstruction[]>("freeform.instructions");
    return instructions;
  }

  public static async freeform() {
    const instructions = Freeform.getInstructions();

    if (!instructions || instructions.length === 0) {
      window.showErrorMessage("Sparkup: Please set your freeform instructions in the settings.");
      return;
    }

    const selected = await window.showQuickPick(instructions.map(i => i.title), {
      title: "Select the instruction you want to use",
      placeHolder: "Select an instruction...",
    });

    if (!selected) {
      return;
    }

    let instruction = instructions.find(i => i.title === selected);
    if (!instruction || !instruction.instruction) {
      window.showErrorMessage("Sparkup: Your instruction is not configured correctly.");
      return;
    }

    const selectionText = getSelectedText();
    if (!selectionText) {
      window.showErrorMessage("Sparkup: Please select some text first.");
      return;
    }

    window.withProgress({
      location: ProgressLocation.Notification,
      cancellable: false,
      title: "Sparkup ✨: Processing..."
    }, async (progress, token) => {
      const result = await AiService.call("freeform", selectionText, instruction?.instruction, undefined, instruction?.nrOfResults);

      if (!result) {
        window.showErrorMessage("Something went wrong. Please try again.");
        return;
      }
      
      // Remove start and end quotes
      const values = result || [];
      if (values && values.length > 0) {

        const uri = Uri.parse(`${SparkupContentProvider.scheme}:Sparkup ✨ - ${instruction?.title}`);

        const content = `# Sparkup - ${instruction?.title}
${values.map((value: string, idx: number) => `
## Result ${idx + 1}

${value}
`).join('')}`;

        const language = window.activeTextEditor?.document.languageId || 'markdown';

        await createDocument(uri, language, content);
      } else {
        window.showWarningMessage(`Sparkup ✨: Sorry, something went wrong. Please try again.`);
      }

      return;
    });
  }
}