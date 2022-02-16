import { Component, Inject, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'selectHorseDialog',
  templateUrl: 'selectHorse.dialog.html',
})
export class SelectHorseDialog implements OnInit {
  public dialogTitle: string;
  public horseNumber: number;
  public showButton: boolean = false;
  public showHorse: boolean = false;
  public showNumber: boolean = false;
  public guestName: string;
  public guestAvatar: string;
  private currentState: number = 1;
  private interval: any;
  private gallop = new Audio();
  private tada = new Audio();

  constructor(private renderer: Renderer2,
    public dialogRef: MatDialogRef<SelectHorseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.gallop.src = "Content/Gallop.wav";
    this.gallop.load();
    //this.gallop.currentTime = 1;
    this.tada.src = "Content/tada.wav";
    this.tada.load();
  }

  ngOnInit() {
    this.dialogTitle = 'Push the button to Select a Horse';
    this.horseNumber = this.data.horseNumber;
    this.guestName = this.data.guestName;
    this.guestAvatar = this.data.guestAvatar;
    this.showButton = true;
  }

  ngAfterViewInit() {
  }

  onSelect() {
   
    this.gallop.play();
    this.showButton = false;
    this.showHorse = true;
    this.showNumber = false;

    this.interval = setInterval(() => {
      this.gallop.pause();
      this.gallop.currentTime = 0;
      this.tada.play();
      this.showButton = false;
      this.showHorse = false;
      this.showNumber = true;

      if (this.currentState == 2) {
        this.tada.pause();
        this.tada.currentTime = 0;
        this.dialogRef.close();
        clearInterval(this.interval);
      }

      this.currentState++;
    }, 1200);
  }
}
