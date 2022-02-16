import { Component, OnInit } from '@angular/core';
import { EventService } from '../../common/Services/event.service';
import { Events, IVWEvents } from '../../common/Models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { EventEditDialog } from './eventEdit.dialog';
import { ConfirmDialog } from '../../common/CustomComponents/ConfirmationDialog/confirm.dialog';
import { ConfirmDialogModel } from '../../common/CustomComponents/ConfirmationDialog/confirmDialog.model';
import { EventRaceSelectDialog } from './eventRaceSelect.dialog';

@Component({
    templateUrl: 'eventList.component.html'
})

export class EventListComponent implements OnInit {
    public datasource: Array<IVWEvents>;
    public displayedColumns: string[] = ['name', 'eventDate', 'actions','races', 'active', 'totals'];

    constructor(private eventService: EventService, public dialog: MatDialog) {
        this.eventService.getEvents().subscribe((data: Array<IVWEvents>) => {
            this.datasource = data;
        });
    }

    ngOnInit() {

    }

    onDeleteClick(id: number) {
        const message = `Are you sure you want to delete this Event?`;

        const dialogData = new ConfirmDialogModel("Confirm Delete", message);

        const dialogRef = this.dialog.open(ConfirmDialog, {
            maxWidth: "400px",
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult == true) {
                this.eventService.delete(id).subscribe(() => {
                    this.loadData();
                });
            }
        });
        
    }

    onEditClick(id: number) {
        this.openDialog(id);
    }
   

    onRacesClick(id: number) {
        const dialogRef = this.dialog.open(EventRaceSelectDialog, {
            width: '500px',
            data: { id: id }
        });

      dialogRef.afterClosed().subscribe(result => {
        this.loadData();
        });
    }

    openDialog(id: number): void {
        const dialogRef = this.dialog.open(EventEditDialog, {
            width: '350px',
            data: {id: id}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadData();
        });
    }

  loadData(): void {
    this.eventService.getEvents().subscribe((data: Array<IVWEvents>) => {
            this.datasource = data;
        });
    }

    onActivateClick(id: number, active: boolean) {
        this.eventService.setActive(id, active).subscribe(() => {
            this.loadData();
        });
    }
}
