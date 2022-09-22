const vscode = require('vscode');
const main = require('./src/main');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "markdown-snippets" is now active!');
	
	let disposable = vscode.commands.registerCommand('markdown-snippets.saveSnippets', async function () {
		var count = await main.parseFiles()
		vscode.window.setStatusBarMessage(`Sucessfully written ${count} markdown snippets.`, 5000)
	});
	context.subscriptions.push(disposable);

	console.log(`Writing files...`);
	main.parseFiles()
	
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
