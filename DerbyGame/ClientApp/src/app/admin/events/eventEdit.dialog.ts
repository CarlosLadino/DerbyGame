import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from '../../Common/Models/event.model';
import { EventService } from '../../Common/Services/event.service';

@Component({
    selector: 'eventEditDialog',
    templateUrl: 'eventEdit.dialog.html',
})
export class EventEditDialog implements OnInit, AfterViewInit  {
    public event: Events;
    public dialogTitle: string;
    constructor(
        private eventService: EventService,
        public dialogRef: MatDialogRef<EventEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Events) {
        
    }

    ngOnInit() {
        this.event = this.data;
        this.dialogTitle = this.data.id > 0 ? 'Edit Event' : 'Enter New Event';
        this.eventService.getEvent(this.data.id).subscribe((result: Events) => {
            this.event = result;
        });
    }

    ngAfterViewInit() {
        
    
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        this.eventService.save(this.event).subscribe(() => {
            this.dialogRef.close();
        });
    }

}
