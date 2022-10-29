import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { VwEventRaceGuests } from '../Models/eventRaceGuest.model';
import { RaceInstance } from '../Models/raceInstance.model';
@Component({
  selector: 'pre-race-roster-component',
  templateUrl: './preRaceRoster.component.html',
})

export class PreRaceRosterComponent {
  @Input() raceInstance: RaceInstance;
  @Output() done = new EventEmitter();

  public horse: VwEventRaceGuests = new VwEventRaceGuests(0,0);
  private showRosterTimer: any;
  constructor() {

  }

  ngOnInit() {
 
  }

  public onStartDisplay() {
    this.showRosterTimer = timer(0, 2000).subscribe((n: any) => {
      if (n == this.raceInstance.eventRaceGuests.length) {
        this.showRosterTimer.unsubscribe();
        this.done.emit();
      } else {
        this.horse = this.raceInstance.eventRaceGuests[n];
      }  
    });
  }
}
