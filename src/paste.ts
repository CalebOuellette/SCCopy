import {  Position, Range, TextEdit, Uri, Selection, window, workspace, WorkspaceEdit} from 'vscode';
import { Copy } from './copy';
export class Paste {

    constructor() {

    }

    //Build off of this guide: http://www.chrisstead.com/archives/1082/visual-studio-code-extensions-editing-the-document/  
    //which now seems overly compilcated and is not in .ts :(

    public pasteText(key: string, copyObj: Copy): void {
       
        let pos: Selection = window.activeTextEditor.selection;
        this.applyEdit(pos, copyObj.getItem(key));

    }

    private applyEdit(coords, content): void {
        var vsDocument = window.activeTextEditor.document;
        var edit = this.setEditFactory(vsDocument.uri, coords, content);
        workspace.applyEdit(edit);
    }

  
    private setEditFactory(uri: Uri, coords, content): WorkspaceEdit {
        var workspaceEdit = new WorkspaceEdit();
        let edit =  new TextEdit(coords, content);

        workspaceEdit.set(uri, [edit]);
        return workspaceEdit;
    }


}