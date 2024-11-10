const vscode = require('vscode');

function activate(context) {
    const foldingProvider = {
        provideFoldingRanges(document) {
            const ranges = [];
            const regex = /(["'`])(?:(?=(\\?))\2.)*?\1/; // Regex to match any string inside quotes

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                if (regex.test(line.text)) {
                    ranges.push(new vscode.FoldingRange(i, i, vscode.FoldingRangeKind.Region));
                }
            }
            return ranges;
        }
    };

    // Register the folding provider for JavaScript and plain text files
    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider({ language: 'javascript' }, foldingProvider),
        vscode.languages.registerFoldingRangeProvider({ language: 'plaintext' }, foldingProvider)
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
