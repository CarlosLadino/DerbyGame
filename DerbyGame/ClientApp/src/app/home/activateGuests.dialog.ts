import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestService } from '../Common/Services/guest.service';
import { IGuests } from '../Common/Models/guest.model';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material';

@Component({
    selector: 'activateGuestsDialog',
    templateUrl: 'activateGuests.dialog.html',
})
export class ActivateGuestsDialog implements OnInit, AfterViewInit  {
    public dialogTitle: string;
    public guests: IGuests[];
    public selectedGuests = new FormControl();
    @ViewChild(MatSelectionList, { static: false })
    private selectionList: MatSelectionList;

    constructor(private guestService: GuestService,
        public dialogRef: MatDialogRef<ActivateGuestsDialog>,
        @Inject(MAT_DIALOG_DATA) public data) {
        
    }

    ngOnInit() {
        this.dialogTitle = 'Active Guests';
        this.guestService.getNotActiveGuests().subscribe((guests: IGuests[]) => {
            this.guests = guests;
        });
    }

    ngAfterViewInit() {
        
    
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        
        var numberOfGuests: number = this.selectionList.selectedOptions.selected.length;
        if (numberOfGuests > 0) {
            this.selectionList.selectedOptions.selected.forEach((item) => {
                this.guestService.setIsActive(item.value, true).subscribe(() => {
                    numberOfGuests--;
                    if (numberOfGuests == 0) {
                        this.dialogRef.close();
                    }
                });
            });
        }
        else {
            this.dialogRef.close();
        }
        
        
    }
}
