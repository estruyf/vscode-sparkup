import { Disposable, ExtensionContext, TextDocumentContentProvider, Uri, workspace } from "vscode";


export class SparkupContentProvider implements TextDocumentContentProvider, Disposable {

	public static scheme = 'SparkupContentProvider.headlines';

	constructor(private context: ExtensionContext) {}

	init() {
		this.context.subscriptions.push(
			workspace.registerTextDocumentContentProvider(SparkupContentProvider.scheme, this)
		);
	}

	dispose() {
	}

	async provideTextDocumentContent(uri: Uri): Promise<string | null> {
		return "";
	}
}