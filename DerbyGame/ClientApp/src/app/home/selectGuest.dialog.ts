import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestService } from '../common/Services/guest.service';
import { IGuests } from '../common/Models/guest.model';
import { FormControl } from '@angular/forms';
import { RaceInstanceService } from '../common/Services/raceInstance.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'selectGuestDialog',
  templateUrl: 'selectGuest.dialog.html',
})
export class SelectGuestDialog implements OnInit, AfterViewInit {
  public dialogTitle: string;
  public guests: MatTableDataSource<IGuests> = new MatTableDataSource<IGuests>();
  public selectedGuests = new FormControl();
  public displayedColumns: string[] = ['avatar', 'name'];
  public filter: string;
  constructor(private raceInstanceService: RaceInstanceService,
    public dialogRef: MatDialogRef<SelectGuestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.dialogTitle = 'Select a Guest';
    this.raceInstanceService.getActiveGuests().subscribe((result) => {
      this.guests = new MatTableDataSource<IGuests>(result);

    });
  }

  ngAfterViewInit() {


  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSelectedtGuest(row: IGuests) {
    this.dialogRef.close(row);
  }

  applyFilter(event: any) {
    let filterValue = event.target.value
    this.guests.filter = filterValue.trim().toLowerCase();
  }
}
