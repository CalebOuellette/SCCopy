import * as vscode from 'vscode';
import {  Position, Range, TextEdit, Uri} from 'vscode';
export class Paste {

    constructor() {

    }

    //Build off of this guide: http://www.chrisstead.com/archives/1082/visual-studio-code-extensions-editing-the-document/  

    pasteText() {

       
        let pos = vscode.window.activeTextEditor.selection.active;
        this.applyEdit(pos, 'hello');

    }

    applyEdit(coords, content) {
        var vsDocument = vscode.window.activeTextEditor.document;
        var edit = this.setEditFactory(vsDocument.uri, coords, content);
        vscode.workspace.applyEdit(edit);

    }

    positionFactory(line: number, char: number) {
        return new vscode.Position(line, char);
    }



    rangeFactory(start: Position, end: Position) {
        return new vscode.Range(start, end);
    }


    textEditFactory(range: Range, content: string) {
        return new vscode.TextEdit(range, content);
    }



    editFactory(coords, content) {
         var start = this.positionFactory(coords.start.line, coords.start.char);
        var end = this.positionFactory(coords.end.line, coords.end.char);
        var range = this.rangeFactory(start, end);

        return this.textEditFactory(range, content);
    }


    workspaceEditFactory() {
        return new vscode.WorkspaceEdit();
    }


    setEditFactory(uri: Uri, coords, content) {
        var workspaceEdit = this.workspaceEditFactory();
        var edit = this.editFactory(coords, content);

        workspaceEdit.set(uri, [edit]);
        return workspaceEdit;
    }


}