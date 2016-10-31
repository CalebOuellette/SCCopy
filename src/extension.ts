'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Copy} from './copy';
import { Paste } from './paste';
import { StatusBarHandler } from './statusBarHandler';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    var copyHolder = new Copy;
    var _statusBarHandler = new StatusBarHandler;
    var paste = new Paste;

    let keys = 9;
    let copyCommands = [];
    let pasteCommands = [];

    for (let index = 0; index < keys; index++) { //build the 10 copy commands. Can't pass data into commands to this seems like the best way?
        let copyName = 'copy ' + index;
        let pasteName = 'paste ' + index;

        let copyCmd = vscode.commands.registerCommand(copyName, () => {
            copyHolder.saveHighlight(copyName);
            _statusBarHandler.updateStatusBar(copyHolder);

        })
        copyCommands.push(copyCmd);

        let pasteCmd = vscode.commands.registerCommand(pasteName, () => {
            paste.pasteText(copyName, copyHolder);
        })
        pasteCommands.push(copyCmd);

    }



    vscode.workspace.onDidChangeConfiguration(() => {
        //show statusBarHandler setting
        var settings = vscode.workspace.getConfiguration('scc.setting');
        if (settings.has('showStatusBar')) {            
            _statusBarHandler.showstatusBar = settings.get('showStatusBar') as boolean;
            _statusBarHandler.updateStatusBar(copyHolder);
        }
        else{
            _statusBarHandler.showstatusBar = true;
            _statusBarHandler.updateStatusBar(copyHolder);
        }


    });


    let disposable: any = [...copyCommands];

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}