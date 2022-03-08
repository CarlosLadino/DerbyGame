import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectGuestDialog } from '../../home/selectGuest.dialog';

@Component({

    selector: 'guest-selection-component',
    templateUrl: './guestSelection.component.html',

})

export class GuestSelectionComponent {

  @Input() selectedGuestId: number;
  @Output() selectedGuestIdChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() size: string = "small";
  public guestName: string;
  public avatarFileName: string;
  public imageSize: string = '';
  public fontSize: string = '';

  constructor(public dialog: MatDialog) {
      
    }

    ngOnInit() {
      if (!this.avatarFileName) {
        this.avatarFileName = 'person.png';
      }
      else {
        this.avatarFileName = this.avatarFileName;
      }
      if (this.size == "small") {
        this.imageSize = "30px";
        this.fontSize = "11px";
      } else {
        this.imageSize = "70px";
        this.fontSize = "35px";
      }
    }
  onSelectGuest() {
    const dialogRef = this.dialog.open(SelectGuestDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let id: number = 0;
      let avatarName = 'person.png';
      let name = '';

      if (dialogResult != undefined) {
        id = dialogResult.id;
        avatarName = dialogResult.avatarName;
        name = dialogResult.name;
      }

      this.selectedGuestId = id;
      this.avatarFileName = avatarName;
      this.guestName = name;
      this.selectedGuestIdChange.emit(this.selectedGuestId);
    });
  }
}
