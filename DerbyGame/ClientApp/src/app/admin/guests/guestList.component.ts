import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../common/Services/guest.service';
import { IGuests } from '../../common/Models/guest.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GuestEditDialog } from './guestEdit.dialog';
import { ConfirmDialog } from '../../common/CustomComponents/ConfirmationDialog/confirm.dialog';
import { ConfirmDialogModel } from '../../common/CustomComponents/ConfirmationDialog/confirmDialog.model';

@Component({
    templateUrl: 'guestList.component.html'
})

export class GuestListComponent implements OnInit {
    public datasource: MatTableDataSource<IGuests> = new MatTableDataSource<IGuests>();
    public displayedColumns: string[] = ['avatar','name', 'isActive', 'actions'];
    public filter: string;

    constructor(private guestService: GuestService, public dialog: MatDialog) {
        this.guestService.getGuests().subscribe((data: Array<IGuests>) => {
            this.datasource = new MatTableDataSource<IGuests>(data);
        });
    }

    ngOnInit() {

    }

    onDeleteClick(id: number) {
        const message = `Are you sure you want to delete this Guest?`;

        const dialogData = new ConfirmDialogModel("Confirm Delete", message);

        const dialogRef = this.dialog.open(ConfirmDialog, {
            maxWidth: "400px",
          data: dialogData,
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult == true) {
                this.guestService.delete(id).subscribe(() => {
                    this.loadData();
                });
            }
        });
    }

    onEditClick(id: number) {
        this.openDialog(id);
    }

    openDialog(id: number): void {
        const dialogRef = this.dialog.open(GuestEditDialog, {
            width: '350px',
          data: { id: id },
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadData();
        });
    }

    loadData(): void {
        this.guestService.getGuests().subscribe((data: Array<IGuests>) => {
            this.datasource = new MatTableDataSource(data);
        });
    }

    onIsActiveClick(id: number, isActiveValue: boolean) {
        this.guestService.setIsActive(id, isActiveValue).subscribe(() => {
            this.loadData();
            this.filter = '';
        });
    }

    onResetAllClick() {
        const message = `Are you sure you want to reset all Guest to inactive?`;

        const dialogData = new ConfirmDialogModel("Confirm Reset", message);

        const dialogRef = this.dialog.open(ConfirmDialog, {
            maxWidth: "400px",
          data: dialogData,
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult == true) {
                this.guestService.resetIsActiveAll().subscribe(() => {
                    this.loadData();
                    this.filter = '';
                });
            }
        });
    }

  applyFilter(event: any) {
      let filterValue = event.target.value
      this.datasource.filter = filterValue.trim().toLowerCase();
    }
}
