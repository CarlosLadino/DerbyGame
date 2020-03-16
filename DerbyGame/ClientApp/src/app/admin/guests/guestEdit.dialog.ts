import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guests } from '../../Common/Models/guest.model';
import { GuestService } from '../../Common/Services/guest.service';

@Component({
    selector: 'guestEditDialog',
    templateUrl: 'guestEdit.dialog.html',
})
export class GuestEditDialog implements OnInit, AfterViewInit  {
    public guest: Guests;
    public dialogTitle: string;
    constructor(
        private guestService: GuestService,
        public dialogRef: MatDialogRef<GuestEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Guests) {
        
    }

    ngOnInit() {
        this.guest = this.data;
        this.dialogTitle = this.data.Id > 0 ? 'Edit Guest' : 'Enter New Guest';
        this.guestService.getGuest(this.data.Id).subscribe((result: Guests) => {
            this.guest = result;
        });
    }

    ngAfterViewInit() {
        
    
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        this.guestService.save(this.guest).subscribe(() => {
            this.dialogRef.close();
        });
    }

}
