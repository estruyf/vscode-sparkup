import { CommandsWebviewProvider } from "../providers";
import { window } from 'vscode';


export class CommandPanel {

  public static register() {
    window.registerWebviewViewProvider('sparkup.commands', new CommandsWebviewProvider(), {});
  }
}