import { RevisionText } from './commands/RevisionText';
import * as vscode from 'vscode';
import { SeoOptimization, TextEdits } from './commands';



export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.fixSpelling', TextEdits.fixSpelling)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.biasFreeLanguage', TextEdits.biasFreeLanguage)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.freeform', TextEdits.freeform)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.seoOptimize', SeoOptimization.optimize)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.revisionText', RevisionText.revision)
	);

	console.log(`Sparkup ✨ is now active!`);
}

export function deactivate() {}

