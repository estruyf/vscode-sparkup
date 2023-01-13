import { RevisionText } from './commands/RevisionText';
import * as vscode from 'vscode';
import { headline, SeoOptimization, TextEdits } from './commands';
import { SparkupContentProvider } from './provider';



export function activate(context: vscode.ExtensionContext) {

	new SparkupContentProvider(context).init();

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.headline', headline.generate)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.fixSpelling', TextEdits.fixSpelling)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.biasFreeLanguage', TextEdits.biasFreeLanguage)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.simplify', TextEdits.simplify)
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

