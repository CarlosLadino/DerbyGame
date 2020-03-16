import { Component, Input, OnInit } from '@angular/core';



@Component({

    selector: 'guest-component',

    templateUrl: './guest.component.html',

})

export class GuestComponent {

    @Input() avatarName: string;
    @Input() guestName: string;
    public avatarFileName: string;
    constructor() {
      
    }

    ngOnInit() {
        if (!this.avatarName) {
            this.avatarFileName = 'person';
        }
        else {
            this.avatarFileName = this.avatarName;
        }
    }

}
