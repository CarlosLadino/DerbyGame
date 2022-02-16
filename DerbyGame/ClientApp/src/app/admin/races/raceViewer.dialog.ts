import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Races } from '../../common/Models/race.model';

@Component({
  selector: 'raceViewerDialog',
  templateUrl: 'raceViewer.dialog.html',
})
export class RaceViewerDialog implements OnInit {
  public horseNumberList: number[] = [];
  public dialogTitle: string;
  @ViewChild('video', { static: false })
  public video: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<RaceViewerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Races) {
    this.dialogTitle = 'View Race';
  }

  ngOnInit() {
   
   
  }

  ngAfterViewInit() {
    this.video.nativeElement.src = this.data.videoName ? "Races/" + this.data.videoName : "";
    this.video.nativeElement.load();
    if (this.data.videoName == "DerbyCallToPost.mp4") {
      if (this.video.nativeElement.webkitRequestFullscreen) {
        this.video.nativeElement.webkitRequestFullscreen();
      }
      this.video.nativeElement.play();
    }
  } 

  onVideoEnded() {
    if (this.video.nativeElement.webkitExitFullscreen) {
      this.video.nativeElement.webkitExitFullscreen();
    }
    
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
