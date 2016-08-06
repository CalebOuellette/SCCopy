'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Copy} from './copy';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    var copyHolder = new Copy;

    let keys = 9;
    let copyCommands = [];
    for (let index = 0; index < keys; index++) { //build the 10 copy commands. Can't pass data into commands to this seems like the best way?
        let name = 'copy ' + index;
        let cmd = vscode.commands.registerCommand(name, () => {                    
            copyHolder.saveHighlight(name);            
            vscode.window.showInformationMessage('Hello ' + copyHolder.getItem(name));
        })
        copyCommands.push(cmd);
    }




    let disposable: any = [...copyCommands];

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}