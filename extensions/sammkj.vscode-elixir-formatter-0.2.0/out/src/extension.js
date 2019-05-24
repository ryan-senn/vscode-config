"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const edit_provider_1 = require("./edit-provider");
function activate(context) {
    const editProvider = new edit_provider_1.default();
    context.subscriptions.push(vscode_1.languages.registerDocumentFormattingEditProvider("elixir", editProvider));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map