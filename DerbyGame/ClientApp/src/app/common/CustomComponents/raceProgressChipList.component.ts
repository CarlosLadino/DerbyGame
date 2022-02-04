import { Component, Input, OnInit } from '@angular/core';
import { VwEventRaceGuests } from '../Models/eventRaceGuest.model';
@Component({
  selector: 'race-progress-chip-list-component',
  templateUrl: './raceProgressChipList.component.html',
})

export class RaceProgressChipListComponent {
  @Input() horse: VwEventRaceGuests;
  @Input() place: number;
  constructor() {
    
  }

  ngOnInit() {
 
  }
}
