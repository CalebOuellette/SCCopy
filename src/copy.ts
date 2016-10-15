import { window } from 'vscode';


export class Copy {

    constructor() { }

    private items: Object = {};//Holds the copied data. Should implment a class.


    public saveHighlight(key: string) {
        //Called to save a highlight
        var editor = window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        if (!text) {
            return; // No string.
        }
        this.addItem(key, text);
    }

    public addItem(key: string, item: string) {
        if (!key || !item) {
            return;
        }
        this.items[key] = item;
    }

    public getItem(key: string) {
        if (!key) {
            return;
        }
        return this.items[key];
    }

    public getTextSummary() {
        let outText: string = 'SCC[';

        for (let item in this.items) {
            outText = outText + item + ':'
            if(this.items[item].length > 6){
                outText = outText + this.items[item].substring(0, 6) + '... ';
            }else{
                outText = outText  + this.items[item];
            }
            
        }
        outText = outText + ']';

        return outText;
    }

}