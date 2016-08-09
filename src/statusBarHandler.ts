import { StatusBarItem, window, StatusBarAlignment } from 'vscode';
import { Copy } from './copy';

export class StatusBarHandler {

    private _statusBarItem: StatusBarItem;



    public updateStatusBar(copyObj: Copy) {

        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
        this._statusBarItem.show();
        let doc = editor.document;    
        this._statusBarItem.text = copyObj.getTextSummary();
    }  
}