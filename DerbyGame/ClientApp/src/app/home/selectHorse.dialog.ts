import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'selectHorseDialog',
    templateUrl: 'selectHorse.dialog.html',
})
export class SelectHorseDialog implements OnInit{
    public dialogTitle: string;
    public horseNumber: number;
    public showButton: boolean = true;
    public showHorse: boolean = false;
    public showNumber: boolean = false;
    public guestName: string;
    public guestAvatar: string;
    private currentState: number = 1;
    private interval;
    constructor(
        public dialogRef: MatDialogRef<SelectHorseDialog>,
        @Inject(MAT_DIALOG_DATA) public data) {
        
    }

    ngOnInit() {
        this.dialogTitle = 'Push the button to Select a Horse';
        this.horseNumber = this.data.horseNumber;
        this.guestName = this.data.guestName;
        this.guestAvatar = this.data.guestAvatar;
     

    }

    onSelect() {
        this.showButton = false;
        this.showHorse = true;
        this.showNumber = false;

        this.interval = setInterval(() => {
            this.showButton = false;
            this.showHorse = false;
            this.showNumber = true;
            
            if (this.currentState == 2) {
                this.dialogRef.close();
                clearInterval(this.interval);
            }

            this.currentState++;
        }, 1200);
    }

    private switchStates() {
        
    }
}
