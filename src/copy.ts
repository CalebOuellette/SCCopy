import { window } from 'vscode';


export class Copy {

    constructor() { }

    private items: Object = {};



    public saveHighlight(key: string) {
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
            outText = outText + item + ':' + this.items[item].substring(0, 7) + ' ';
        }
        outText = outText + ']';

        return outText;
    }

}