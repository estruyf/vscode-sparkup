import { CommandPanel } from './panels/CommandPanel';
import { COMMANDS } from './constants/Commands';
import { Extension } from './service/Extension';
import { Freeform } from './commands/Freeform';
import { Metadata } from './commands/Metadata';
import { RevisionText } from './commands/RevisionText';
import * as vscode from 'vscode';
import { Excerpts, Headline, SeoOptimization, TextEdits } from './commands';
import { SparkupContentProvider } from './provider';



export function activate(context: vscode.ExtensionContext) {
	Extension.getInstance(context);
	new SparkupContentProvider(context).init();

	/**
	 * Headlines
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.HEADLINE, Headline.generate)
	);


	/**
	 * Excerpts
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.EXCERPTS, Excerpts.process)
	);


	/**
	 * Text Edits
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.FIX_SPELLING, TextEdits.fixSpelling)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.BIAS_FREE_LANGUAGE, TextEdits.biasFreeLanguage)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.SIMPLIFY, TextEdits.simplify)
	);


	/**
	 * Freeform
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.FREEFORM, Freeform.freeform)
	);


	/**
	 * Revision Text
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.REVISION_TEXT, RevisionText.revision)
	);


	/**
	 * SEO Optimization
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.SEO_OPTIMIZATION, SeoOptimization.optimize)
	);


	/**
	 * Categorization
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.CATEGORIZE, Metadata.process)
	);

	/**
	 * Register the tree view
	 */
	CommandPanel.register();

	/**
	 * Settings command
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.OPEN_SETTINGS, () => {
			vscode.commands.executeCommand('workbench.action.openSettings', '@ext:eliostruyf.vscode-sparkup');
		})
	);

	console.log(`Sparkup ✨ is now active!`);
}

export function deactivate() {}

