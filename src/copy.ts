import * as vscode from 'vscode';


export class Copy{

    constructor(){}
    
    private items: Object = {};



    public saveHighlight(key: string){
         var editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }
            var selection = editor.selection;
            var text = editor.document.getText(selection);
            if(!text){
                return; // No string.
            }
            this.addItem(key, text);
    }

    public addItem(key: string, item: string){
        if(!key || !item){
            return;
        }
        this.items[key] = item;
    }

    public getItem(key: string){
        if(!key){
            return;
        }
        return this.items[key];
    }
}