import { Freeform } from './commands/Freeform';
import { Metadata } from './commands/Metadata';
import { RevisionText } from './commands/RevisionText';
import * as vscode from 'vscode';
import { Excerpts, Headline, SeoOptimization, TextEdits } from './commands';
import { SparkupContentProvider } from './provider';



export function activate(context: vscode.ExtensionContext) {

	new SparkupContentProvider(context).init();

	/**
	 * Headlines
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.headline', Headline.generate)
	);


	/**
	 * Excerpts
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.excerpts', Excerpts.process)
	);


	/**
	 * Text Edits
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.fixSpelling', TextEdits.fixSpelling)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.biasFreeLanguage', TextEdits.biasFreeLanguage)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.simplify', TextEdits.simplify)
	);


	/**
	 * Freeform
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.freeform', Freeform.freeform)
	);


	/**
	 * Revision Text
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.revisionText', RevisionText.revision)
	);


	/**
	 * SEO Optimization
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.seoOptimize', SeoOptimization.optimize)
	);


	/**
	 * Categorization
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-sparkup.categorizeAndTag', Metadata.process)
	);

	console.log(`Sparkup ✨ is now active!`);
}

export function deactivate() {}

