"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const cp = require("child_process");
function fullDocumentRange(document) {
    const lastLineId = document.lineCount - 1;
    return new vscode_1.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}
function format(document) {
    return new Promise((resolve, reject) => {
        const cmd = `mix format ${document.fileName}`;
        const cwd = vscode_1.workspace.rootPath ? vscode_1.workspace.rootPath : "";
        cp.exec(cmd, {
            cwd
        }, function (error, stdout, stderr) {
            if (error !== null) {
                const message = `Cannot format due to syntax errors.: ${stderr}`;
                vscode_1.window.showErrorMessage(message);
                return reject(message);
            }
            else {
                return [vscode_1.TextEdit.replace(fullDocumentRange(document), stdout)];
            }
        });
    });
}
class PrettierEditProvider {
    provideDocumentFormattingEdits(document, options, token) {
        return document.save().then(() => {
            return format(document);
        });
    }
}
exports.default = PrettierEditProvider;
//# sourceMappingURL=edit-provider.js.map