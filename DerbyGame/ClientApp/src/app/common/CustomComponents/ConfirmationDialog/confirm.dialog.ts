import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmDialogModel } from './confirmDialog.model';

@Component({
    selector: 'confirmDialog',
    templateUrl: './confirm.dialog.html',
})
export class ConfirmDialog implements OnInit {
    title: string;
    message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
        // Update view with given values
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit() {
    }

    onConfirm(): void {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
}

