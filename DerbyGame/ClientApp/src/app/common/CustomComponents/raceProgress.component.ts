import { Component, Input, OnInit } from '@angular/core';
import { VwEventRaceGuests } from '../Models/eventRaceGuest.model';
import { RaceInstance } from '../Models/raceInstance.model';
@Component({
  selector: 'race-progress-component',
  templateUrl: './raceProgress.component.html',
})

export class RaceProgressComponent {
  @Input() raceInstance: RaceInstance;
  constructor() {
    
  }

  ngOnInit() {
 
  }
  filterIsProtagonist(horse: VwEventRaceGuests) {
    return horse.isProtagonist == true;
  }
}
