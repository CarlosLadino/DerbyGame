import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Races } from '../../common/Models/race.model';
import { RaceService } from '../../common/Services/race.service';
import { RaceResultService } from '../../common/Services/raceResult.service';
import { RaceResults } from '../../common/Models/raceResult.model';
import { RaceWithdrawnHorseDialog } from './raceWithdrawnHorse.dialog';

@Component({
    selector: 'raceEditDialog',
    templateUrl: 'raceEdit.dialog.html',
})
export class RaceEditDialog implements OnInit {
    public race: Races;
    public places: RaceResults[];
    public dialogTitle: string;
    constructor(
        private raceService: RaceService,
        private raceResultService: RaceResultService,
        public dialogRef: MatDialogRef<RaceEditDialog>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: Races) {
        
    }

    ngOnInit() {
        this.race = this.data;
        this.dialogTitle = this.data.id > 0 ? 'Edit Race' : 'Enter New Race';
        this.raceService.getRace(this.data.id).subscribe((result: Races) => {
            this.race = result;           
        });
        this.raceResultService.getRaceResults(this.data.id).subscribe((result: RaceResults[]) => {
            this.places = result;
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        var isNew = this.race.id == 0;
        this.raceService.save(this.race).subscribe((result: Races) => {
            this.places.forEach((place: RaceResults) => {
                if (isNew) {
                    place.raceId = result.id
                }
                this.raceResultService.save(place).subscribe(() => {
                    this.dialogRef.close();
                });
            });           
        });
    }

  onWithdrawnHorsesClick(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RaceWithdrawnHorseDialog, {
      width: '600px',
      data: { id: this.race.id, numberOfHorses: this.race.numberOfHorses }
    });

    dialogRef.afterClosed().subscribe(result => {
      /*this.loadData();*/
    });
  }
}
