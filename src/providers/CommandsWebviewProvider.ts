import { COMMANDS } from './../constants/Commands';
import { WebviewView, WebviewViewProvider, window } from "vscode";
import { Freeform } from '../commands';


export class CommandsWebviewProvider implements WebviewViewProvider {
  private view?: WebviewView;
  

  public resolveWebviewView(webviewView: WebviewView) {
    this.view = webviewView;

    webviewView.webview.options = {
      enableCommandUris: true,
    }

    webviewView.webview.html = this.generateHtml();

    window.onDidChangeTextEditorSelection((e) => {
      webviewView.webview.html = this.generateHtml();
    });
  }

  private generateHtml() {
    const crntSelection = window.activeTextEditor?.selection;
    const instructions = Freeform.getInstructions();
    let freeformDisabled = false;
    if (!instructions || instructions.length === 0) {
      freeformDisabled = true;
    }

    return `
      <html>
        <head>
          <style>
            h1 {
              font-size: 1.1em;
            }

            .commands {
              width: 100%;
              max-width: 300px;
              margin: 0 auto;
            }

            .commands > * {
              margin-block-start: 1em;
              margin-block-end: 0;
              margin-inline-start: 0;
              margin-inline-end: 0;
            }

            a {
              display: flex !important;
              width: 100% !important;
              align-items: center !important;
              justify-content: center !important;
              text-align: center !important;

              align-items: center;
              background-color: var(--vscode-button-background);
              border: 0px;
              border-radius: 2px;
              color: var(--vscode-button-foreground);
              cursor: pointer;
              display: inline-block;
              font-size: var(--vscode-font-size);
              font-weight: var(--vscode-font-weight);
              line-height: 22px;
              overflow: hidden;
              padding: 4px;
              user-select: none;
              text-decoration: none;
            }

            a:hover {
              background-color: var(--vscode-button-hoverBackground);
              color: var(--vscode-button-foreground);
            }

            a:active {
              outline: 0;
            }

            a:focus {
              background-color: var(--vscode-button-hoverBackground);
              outline: 1px solid var(--vscode-focusBorder);
              outline-offset: 2px;
            }

            a[disabled] {
              cursor: default;
              opacity: 0.4;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Unlock Your Content's Potential with Sparkup</h1>
            <p>Select text in your file(s), and let it spark by right-clicking and selecting one of the <b>Sparkup</b> options, or use the actions from this panel.</p>

            <div class="commands">
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.CATEGORIZE}" title="Categorize your content">Categorize your content</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.EXCERPTS}" title="Generate excerpts">Generate excerpts</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.HEADLINE}" title="Generate headlines">Generate headlines</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.REVISION_TEXT}" title="Revision your text">Revision your text</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.SEO_OPTIMIZATION}" title="SEO Optimization">SEO Optimization</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.SIMPLIFY}" title="Simplify your content">Simplify your content</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.FIX_SPELLING}" title="Spelling check">Spelling check</a>
              <a ${!crntSelection?.isEmpty ? "" : "disabled"} href="command:${COMMANDS.BIAS_FREE_LANGUAGE}" title="Use bias-free language">Use bias-free language</a>
              <a ${!crntSelection?.isEmpty && !freeformDisabled ? "" : "disabled"} href="command:${COMMANDS.FREEFORM}" title="Use a freeform instruction">Use freeform instruction</a>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}