import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestService } from '../Common/Services/guest.service';
import { Guests } from '../Common/Models/guest.model';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material';
import { Races } from '../Common/Models/race.model';
import { EventRaceService } from '../common/Services/eventRace.service';
import { VwEventRace } from '../common/Models/eventRace.model';

@Component({
    selector: 'addRaceToEventDialog',
    templateUrl: 'addRaceToEvent.dialog.html',
})
export class AddRaceToEventDialog implements OnInit, AfterViewInit  {
    public dialogTitle: string;
    public races: VwEventRace[];
    public selectedRaces = new FormControl();
    @ViewChild(MatSelectionList, { static: false })
    private selectionList: MatSelectionList;

    constructor(private eventRaceService: EventRaceService,
        public dialogRef: MatDialogRef<AddRaceToEventDialog>,
        @Inject(MAT_DIALOG_DATA) public data) {
        
    }

    ngOnInit() {
        this.dialogTitle = 'Active Guests';
        this.eventRaceService.getNonSelecteRacesByEventId(this.data.id).subscribe((result: VwEventRace[]) => {
            this.races = result;
        });
    }

    ngAfterViewInit() {
        
    
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        
        var numberOfraces: number = this.selectionList.selectedOptions.selected.length;
        if (numberOfraces > 0) {
            this.selectionList.selectedOptions.selected.forEach((item) => {
                this.eventRaceService.setActive(this.data.id, item.value).subscribe(() => {
                    numberOfraces--;
                    if (numberOfraces == 0) {
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
