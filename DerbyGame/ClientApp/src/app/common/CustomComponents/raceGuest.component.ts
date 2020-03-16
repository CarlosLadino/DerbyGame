import { Component, Input, OnInit } from '@angular/core';
import { VwEventRaceGuests } from '../Models/eventRaceGuest.model';
@Component({
    selector: 'race-guest-component',
    templateUrl: './raceGuest.component.html',
})

export class RaceGuestComponent {
    @Input() horse: VwEventRaceGuests;
  
    constructor() {
      
    }

    ngOnInit() {
    
    }

}
