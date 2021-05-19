import { Component, Input, OnInit } from '@angular/core';



@Component({

    selector: 'guest-component',

    templateUrl: './guest.component.html',

})

export class GuestComponent {

    @Input() avatarName: string;
    @Input() guestName: string;
    @Input() size: string = "small"; 
    public avatarFileName: string;
  public imageSize: string = '';
  public fontSize: string = '';

    constructor() {
      
    }

    ngOnInit() {
        if (!this.avatarName) {
            this.avatarFileName = 'person.png';
        }
        else {
            this.avatarFileName = this.avatarName;
      }
      if (this.size == "small") {
        this.imageSize = "30px";
        this.fontSize = "11px";
      } else {
        this.imageSize = "90px";
        this.fontSize = "40px";
      }
    }

}
