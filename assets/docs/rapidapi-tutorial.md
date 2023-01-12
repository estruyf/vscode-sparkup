The easiest way to get started using the Sparkup API, is by using the Sparkup Visual Studio Code extension. The extension allows you to make your markdown content shine by enhancing it via an API.

In this tutorial, we explain how you can start.

## Install the extension

To install the Sparkup extension, first open your Visual Studio Code editor, and follow the next steps:

- Go to the extension panel;
- Search for **sparkup**;

![Install the extension](https://raw.githubusercontent.com/estruyf/vscode-sparkup/main/assets/docs/install.png)

- Once Visual Studio Code found our extension, click on the **install** button;
- Once installed, the welcome experience will guide you through the next steps.

![Welcome experience](https://raw.githubusercontent.com/estruyf/vscode-sparkup/main/assets/docs/welcome.png)

## Subscribe to the API

The welcome experience will first tell you to subscribe to the Sparkup API and get an API key. This API key will be required in Visual Studio Code to make requests.

- Navigate to: [Sparkup API](https://rapidapi.com/eliostruyf/api/sparkup);
- Click on **Subscribe to Test**;

![Subscribe](https://raw.githubusercontent.com/estruyf/vscode-sparkup/main/assets/docs/subscribe.png)

- Choose a plan that fits with your use case. You can start with the basic/free one, for instance, by clicking on the **subscribe** button;

![Pick a plan](https://raw.githubusercontent.com/estruyf/vscode-sparkup/main/assets/docs/plan.png)

- Once subscribed, you can start testing the API, and you can now use your RapidAPI key to call our API;
- Copy your `X-RapidAPI-Key` from the code sample, as you will need this in the next step for Visual Studio Code.

## Add your API key in Visual Studio Code

Returning to Visual Studio Code, we'll store the API key to let Sparkup use the APIs.

- Open the user settings;
- Search for `sparkup`;
- Enter the API key in the **Sparkup: Api Key** input;

![Enter the API key](https://raw.githubusercontent.com/estruyf/vscode-sparkup/main/assets/docs/vscode-setting.png)

- Once completed, you can start using the extension to its full potential.

## Using the extension

You can use the extension by the commands (search for `sparkup` in the command palette), or the menu actions. The last one is the easiest option and will be used for this example.

- Open for instance, a `markdown` file, and select some text you want to let Sparkup rewrite;
- Right-click on the text;
- Choose one of the **Sparkup** actions;

![Sparkup actions](https://raw.githubusercontent.com/estruyf/vscode-sparkup/main/assets/docs/actions.png)

- The extension will ask you a couple of questions depending on the action you choose;
- Once Sparkup completes revisioning your text, it will update it in the current file.