// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hubspot-local-dev-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.createYML', function () {
		// The code you place here will be executed every time your command is executed

		const folderPath = vscode.workspace.workspaceFolders[0].uri
			.toString()
			.split(":")[1];

		const htmlContent =
			`defaultPortal: 'DEV'
			portals:
				# Sample apikey entry, manually entered
				- name: 'DEV'
					portalId: 123
					authType: 'apikey'
					apiKey: 'xxxxxx-xxxxx-xxxxx-xxxxx-xxxxx'
					
				# Sample oauth2 entry, generated from running npx hscms auth oauth2  
				- name: 'PROD'
					portalId: 345
					authType: oauth2
					auth:
						clientId: xxx-xxx-xxx-xxx
						clientSecret: xxx-xxx-xxx-xxx
						scopes:
							- content
						tokenInfo:
							expiresAt: '2019-07-01T16:42:44.311Z'
							refreshToken: xxx-xxx-xxx-xxx
							accessToken: >-
								xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx`;

		fs.writeFile(path.join(folderPath, "hubspot.config.yml"), htmlContent, err => {
			if (err) {
				return vscode.window.showErrorMessage(
					"Failed to create YML file!"
				);
			}
			vscode.window.showInformationMessage("Created HubSpot YML file");
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}