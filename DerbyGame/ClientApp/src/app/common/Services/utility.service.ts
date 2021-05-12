import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../Models/event.model';
import { EventService } from './event.service';
import { Guest } from '../Models/guest.model';

@Injectable({
    providedIn: 'root',
})

export class UtilityService {
    private activeEvent: Events;   
    constructor(private httpClient: HttpClient, private eventService: EventService) {
       
    }

    public loadInitialValues() {
        this.eventService.getActive().subscribe((data: Events) => {
            this.activeEvent = data;
        });
    }

    public get ActiveEvent(): Events {
        return this.activeEvent;
    }

  public get WithdrawnGuest() {
    return new Guest(7003, "Scratched", true, "Scratched", true, true);
  }
}
