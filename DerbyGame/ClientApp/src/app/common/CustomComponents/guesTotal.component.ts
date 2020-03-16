import { Component, Input, OnInit } from '@angular/core';
import { VwEventGuestTotals } from '../Models/eventRace.model';



@Component({

    selector: 'guest-total-component',

    templateUrl: './guestTotal.component.html',

})

export class GuestTotalComponent {

    @Input() guestTotal: VwEventGuestTotals;

    constructor() {
      
    }

    ngOnInit() {
    
    }

}
