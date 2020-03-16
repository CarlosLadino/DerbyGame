import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestService } from '../Common/Services/guest.service';
import { Guests } from '../Common/Models/guest.model';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material';
import { RaceInstance } from '../common/Models/raceInstance.model';
import { VwEventRaceGuests } from '../common/Models/eventRaceGuest.model';

@Component({
    selector: 'showWinnersDialog',
    templateUrl: 'showWinners.dialog.html',
})
export class ShowWinnersDialog implements OnInit, AfterViewInit  {
    public dialogTitle: string;
    public winnerData: winnerRow[] = [];
    constructor(private guestService: GuestService,
        public dialogRef: MatDialogRef<ShowWinnersDialog>,
        @Inject(MAT_DIALOG_DATA) public data: RaceInstance) {
        
    }

    ngOnInit() {
        this.dialogTitle = 'Race Winners';
        this.data.winners.forEach((winner) => {
            var guestRow = new winnerRow(this.data.eventRaceId, winner.assignedHorseNumber);
            guestRow.guestId = winner.guest1Id;
            guestRow.guestName = winner.guest1Name;
            guestRow.placeId = winner.placeId;
            if (winner.guest1Avatar) {
                guestRow.guestAvatar = winner.guest1Avatar;
            }
            
            switch (winner.placeId) {
                case 1:
                    guestRow.amount = this.data.allowSecondGuest ? this.data.firstPlaceAmount / 2 : this.data.firstPlaceAmount;
                    break;
                case 2:
                    guestRow.amount = this.data.allowSecondGuest ? this.data.secondPlaceAmount/2 : this.data.secondPlaceAmount;
                    break;
                case 3:
                    guestRow.amount = this.data.allowSecondGuest ? this.data.thirdPlaceAmount/2 : this.data.thirdPlaceAmount;
                    break;
            }

            this.winnerData.push(guestRow);

            if (this.data.allowSecondGuest) {
                var guestRow2 = new winnerRow(this.data.eventRaceId, winner.assignedHorseNumber);
                guestRow2.guestId = winner.guest2Id;
                guestRow2.guestName = winner.guest2Name;
                guestRow2.placeId = winner.placeId;           
                if (winner.guest2Avatar) {
                    guestRow2.guestAvatar = winner.guest2Avatar;
                }
                switch (winner.placeId) {
                    case 1:
                        guestRow2.amount = this.data.firstPlaceAmount / 2;
                        break;
                    case 2:
                        guestRow2.amount = this.data.secondPlaceAmount/2;
                        break;
                    case 3:
                        guestRow2.amount = this.data.thirdPlaceAmount/2;
                        break;
                }
                this.winnerData.push(guestRow2);
            }
           
        });

        this.winnerData.sort((a, b) => (a.placeId > b.placeId) ? 1 : -1);
    }

    ngAfterViewInit() {
        
    
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

export class winnerRow {
    eventRaceId: number;
    guestId: number;
    guestName: string;
    guestAvatar: string;
    amount: number;
    placeId: number;
    assignedHorseNumber: number;

    constructor(eventRaceId: number, assignedHorseNumber: number) {
        this.eventRaceId = eventRaceId;
        this.guestId = 0;
        this.guestName = "";
        this.guestAvatar = "person";
        this.amount = 0;
        this.placeId = 0;
        this.assignedHorseNumber = assignedHorseNumber;
    }
}
