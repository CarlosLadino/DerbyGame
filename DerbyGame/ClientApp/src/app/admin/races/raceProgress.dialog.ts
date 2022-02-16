import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Races } from '../../common/Models/race.model';
import { IVWRaceProgress, VWRaceProgress } from '../../common/Models/raceProgress.model';
import { RaceService } from '../../common/Services/race.service';
import { RaceProgressService } from '../../common/Services/raceProgress.service';

@Component({
  selector: 'raceProgressDialog',
  templateUrl: 'raceProgress.dialog.html',
})
export class RaceProgressDialog implements OnInit {
  public raceProgress: IVWRaceProgress[] = [];
  public horseNumberList: number[] = [];
  public dialogTitle: string = '';
  public currentRaceProgress: VWRaceProgress;
  public displayedColumns: string[] = ['timeMarker', 'firstPlace', 'secondPlace', 'thirdPlace', 'actions'];
  constructor(
    private raceService: RaceService,
    private raceProgressService: RaceProgressService,
    public dialogRef: MatDialogRef<RaceProgressDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Races) {

    this.currentRaceProgress = new VWRaceProgress(data.id);
  }

  ngOnInit() {
    this.dialogTitle = this.data.name;
    this.getHorseSelection();
    this.loadGrid();

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddTimerMarkerClick(): void {
    if (this.currentRaceProgress.timeMarker != 0 && this.currentRaceProgress.firstPlace != 0 && this.currentRaceProgress.secondPlace != 0 && this.currentRaceProgress.thirdPlace != 0) {
      this.raceProgressService.save(this.currentRaceProgress).subscribe((result: boolean) => {
        if (result) {
          this.currentRaceProgress = new VWRaceProgress(this.data.id);
          this.loadGrid();
        }
      });
    }   
  }

  onDeleteClick(id: number) {
    let raceProgressObj = this.raceProgress.find(e => e.id == id);
    if (raceProgressObj !== undefined) {
      this.raceProgressService.delete(raceProgressObj).subscribe(() => {
        this.loadGrid();
      });
    }
  }

  onTimeMarkerFocus(event: any) {
    event.target.select();
  }

  private getHorseSelection() {
    this.horseNumberList = [];
    let i: number;
    for (i = 0; i < this.data.numberOfHorses; i++) {
      this.horseNumberList.push(i + 1);
    }
  }

  private loadGrid() {
    this.raceProgressService.getRaceProgress(this.data.id).subscribe((result: IVWRaceProgress[]) => {
      this.raceProgress = result;
    });
  }
}
