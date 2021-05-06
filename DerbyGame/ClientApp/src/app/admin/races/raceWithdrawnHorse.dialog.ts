import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RaceWithdrawnHorseService } from '../../common/Services/raceWithdrawnHorse.service';
import { RaceWithdrawnHorses } from '../../common/Models/raceWithdrawnHorse.model';

@Component({
  selector: 'raceWithdrawnHorse',
  templateUrl: 'raceWithdrawnHorse.dialog.html',
})
export class RaceWithdrawnHorseDialog implements OnInit {
  public raceWithdrawnHorses: RaceWithdrawnHorses[];
  public dialogTitle: string;
  constructor(
    private raceWithdrawnHorseService: RaceWithdrawnHorseService,
    public dialogRef: MatDialogRef<RaceWithdrawnHorseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RaceWithdrawnHorses[]) {

  }

  ngOnInit() {
    this.raceWithdrawnHorses = this.data;
    this.dialogTitle = 'Edit Race Withdrawn Horses';
    //this.raceService.getRace(this.data.id).subscribe((result: Races) => {
    //  this.race = result;
    //});
    //this.raceResultService.getRaceResults(this.data.id).subscribe((result: RaceResults[]) => {
    //  this.places = result;
    //});
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    //var isNew = this.race.id == 0;
    //this.raceService.save(this.race).subscribe((result: Races) => {
    //  this.places.forEach((place: RaceResults) => {
    //    if (isNew) {
    //      place.RaceId = result.id
    //    }
    //    this.raceResultService.save(place).subscribe(() => {
    //      this.dialogRef.close();
    //    });
    //  });
    //});
  }

}
