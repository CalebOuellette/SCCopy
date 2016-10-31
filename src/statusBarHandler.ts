import { StatusBarItem, window, StatusBarAlignment, workspace } from 'vscode';
import { Copy } from './copy';

export class StatusBarHandler {

    private _statusBarItem: StatusBarItem;

    public showstatusBar: boolean = true;

    public updateStatusBar(copyObj: Copy) {


        // Create as needed
        if (this.showstatusBar === true) {
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
        else{
            this._statusBarItem.hide();            
        }
    }


}