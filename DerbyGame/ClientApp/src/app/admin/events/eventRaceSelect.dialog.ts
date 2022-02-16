import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from '../../common/Models/event.model';
import { EventService } from '../../common/Services/event.service';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { EventRaceService } from '../../common/Services/eventRace.service';
import { EventRacesList } from '../../common/Models/helperObjects.model';
import { VwEventRace } from '../../common/Models/eventRace.model';

@Component({
    selector: 'eventRaceSelectDialog',
    templateUrl: 'eventRaceSelect.dialog.html',
})
export class EventRaceSelectDialog implements OnInit {
    public races: VwEventRace[] = [];
    public dialogTitle: string = '';
    public selectedRaces = new FormControl();
  @ViewChild(MatSelectionList, { static: true })
  private selectionList: MatSelectionList;

    constructor(
        private eventService: EventService,
        private eventRaceService: EventRaceService,
        public dialogRef: MatDialogRef<EventRaceSelectDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Events) {
        
    }

    ngOnInit() {
        this.dialogTitle = this.data.id > 0 ? 'Race Selection' : 'Select the races for this Event';
        this.eventRaceService.getRacesByEventId(this.data.id).subscribe((result: VwEventRace[]) => {
            this.races = result;        
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        var selectedValues: string = "";
        this.selectionList.selectedOptions.selected.forEach((item) => {
            selectedValues = selectedValues.length > 0 ? selectedValues.concat(`,${item.value}`) : selectedValues.concat(item.value) ;
        });
        var eventRaceList: EventRacesList = new EventRacesList(this.data.id, selectedValues);
        this.eventRaceService.saveList(eventRaceList).subscribe(() => {
            this.dialogRef.close();
        });        
    }

}
