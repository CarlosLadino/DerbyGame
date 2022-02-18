import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../common/Services/race.service';
import { IVWRaces, Races } from '../../common/Models/race.model';
import { MatDialog } from '@angular/material/dialog';
import { RaceEditDialog } from './raceEdit.dialog';
import { ConfirmDialog } from '../../common/CustomComponents/ConfirmationDialog/confirm.dialog';
import { ConfirmDialogModel } from '../../common/CustomComponents/ConfirmationDialog/confirmDialog.model';
import { RaceViewerDialog } from './raceViewer.dialog';
import { RaceProgressDialog } from './raceProgress.dialog';



@Component({
  templateUrl: 'raceList.component.html'
})

export class RaceListComponent implements OnInit {
  public datasource: Array<Races> = [];
  public displayedColumns: string[] = ['name', 'numberOfHorses', 'raceProgressNumber', 'actions', 'videoViewer'];

  constructor(private raceService: RaceService, public dialog: MatDialog) {
    this.raceService.getRaces().subscribe((data: Array<IVWRaces>) => {
      this.datasource = data;
    });
  }

  ngOnInit() {

  }

  onDeleteClick(id: number) {
    const message = `Are you sure you want to delete this Race?`;

    const dialogData = new ConfirmDialogModel("Confirm Delete", message);

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult == true) {
        this.raceService.delete(id).subscribe(() => {
          this.loadData();
        });
      }
    });

  }

  onEditClick(id: number) {
    this.openDialog(id);
  }

  onProgressClick(id: number, numberOfHorses: number, name: string) {
    this.openProgressDialog(id, numberOfHorses, name);
  }
  onRacesClick(id: number) {
    alert("Select races");
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(RaceEditDialog, {
      width: '600px',
      data: { id: id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  openProgressDialog(id: number, numberOfHorses: number, name: string): void {
    const dialogRef = this.dialog.open(RaceProgressDialog, {
      width: '600px',
      data: { id: id, numberOfHorses: numberOfHorses, name: name },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      /* this.loadData();*/
    });
  }

  onViewClick(videoName: string) {
    const dialogRef = this.dialog.open(RaceViewerDialog, {
      width: '1024px',
      data: { videoName: videoName },
      disableClose: true
    });
  }

  loadData(): void {
    this.raceService.getRaces().subscribe((data: Array<Races>) => {
      this.datasource = data;
    });
  }
}
