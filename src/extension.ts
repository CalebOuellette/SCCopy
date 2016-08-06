'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Copy} from './copy';
import { Paste } from './paste';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    var copyHolder = new Copy;

    var paste = new Paste;

    let keys = 9;
    let copyCommands = [];
    let pasteCommands = [];
    for (let index = 0; index < keys; index++) { //build the 10 copy commands. Can't pass data into commands to this seems like the best way?
        let copyName = 'copy ' + index;
        let copyCmd = vscode.commands.registerCommand(copyName, () => {                    
            copyHolder.saveHighlight(copyName);            
            vscode.window.showInformationMessage('Hello ' + copyHolder.getItem(copyName));
        })
        copyCommands.push(copyCmd);

        let pasteName = 'paste ' + index;
        let pasteCmd = vscode.commands.registerCommand(pasteName, () => {                    
            paste.pasteText();        
            vscode.window.showInformationMessage('Hello ' + copyHolder.getItem(pasteName));
        })
        pasteCommands.push(copyCmd);

    }




    let disposable: any = [...copyCommands];

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}