import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RaceWithdrawnHorseService } from '../../common/Services/raceWithdrawnHorse.service';
import { RaceWithdrawnHorses } from '../../common/Models/raceWithdrawnHorse.model';
import { Races } from '../../common/Models/race.model';

@Component({
  selector: 'raceWithdrawnHorse',
  templateUrl: 'raceWithdrawnHorse.dialog.html',
})
export class RaceWithdrawnHorseDialog implements OnInit {
  private raceId: number;
  public horseNumberList: number[] = [];
  public raceWithdrawnHorses: RaceWithdrawnHorses[];
  public dialogTitle: string;
  public displayedColumns: string[] = ['horseNumber', 'actions'];
  public selectedHorseNumber: number;
  constructor(
    private raceWithdrawnHorseService: RaceWithdrawnHorseService,
    public dialogRef: MatDialogRef<RaceWithdrawnHorseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Races) {
  }

  ngOnInit() {
    this.raceId = this.data.id;
    this.dialogTitle = 'Manage Race Scratched Horses';

    this.getWithdrawnHorses();   
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddNumberClick(): void {
    if (this.selectedHorseNumber > 0) {
      var rwh: RaceWithdrawnHorses = new RaceWithdrawnHorses(0, this.data.id, this.selectedHorseNumber);
      this.raceWithdrawnHorseService.save(rwh).subscribe(() => {
        this.getWithdrawnHorses();
      });
    }    
  }

  onDeleteClick(id: number) {
    this.raceWithdrawnHorseService.delete(id).subscribe(() => {
      this.getWithdrawnHorses();
    });
  }

  private getWithdrawnHorses() {
    this.raceWithdrawnHorseService.getRaceWithdrawnHorses(this.data.id).subscribe((result: RaceWithdrawnHorses[]) => {
      this.raceWithdrawnHorses = result;
      this.getHorseSelection();
    });
  }

  private getHorseSelection() {
    this.horseNumberList = [];
    let i: number;
    for (i = 0; i < this.data.numberOfHorses; i++) {
      if (!this.raceWithdrawnHorses.some(item => item.horseNumber === i + 1)) {
        this.horseNumberList.push(i + 1);
      }     
    }
  }
}
