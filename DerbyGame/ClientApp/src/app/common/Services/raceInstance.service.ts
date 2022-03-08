import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guest, IGuests, IVWGuests } from '../Models/guest.model';
import { Observable, Subject } from 'rxjs';
import { GuestService } from './guest.service';

@Injectable({
    providedIn: 'root',
})

export class RaceInstanceService {
  private activeGuests: IGuests[] = [];

  constructor(private httpClient: HttpClient, private guestService: GuestService) {

  }

  public getActiveGuests(reload: boolean = true): Observable<IGuests[]> {
    var subject = new Subject<IGuests[]>();
    if (reload) {
      this.guestService.getActiveGuests().subscribe((result) => {
        this.activeGuests = result;
        subject.next(this.activeGuests);
      });
    }
    else {
      subject.next(this.activeGuests);
    }

    return subject;
  }

  public getActiveGuest(id: number): IGuests {
    var selectedGuestObj =  this.activeGuests.find(guest => guest['id'] === id);
    if (selectedGuestObj != undefined) {
      return selectedGuestObj;
    }
    else {
      return new Guest(0, "Unknown", false, 'person.png', false, true);
    }
  } 
}
