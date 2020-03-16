import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventRaceGuests } from '../Models/eventRaceGuest.model';

@Injectable({
    providedIn: 'root',
})

export class EventRaceGuestService {
    public apiController = 'api/EventRaceGuests/';
    constructor(private httpClient: HttpClient) {

    }

    public getEvents() {
        return this.httpClient.get(`${this.apiController}GetEventRaceGuests`);
    }

    public getEventRaceGuestsByEventRaceId(id: number) {
        return this.httpClient.get(`${this.apiController}GetEventRaceGuestsByEventRaceId/${id}`);
    }

    public getEventRaceGuest(id: number) {
        return this.httpClient.get(`${this.apiController}GetEventRaceGuest/${id}`);
    }

    public save(record: EventRaceGuests) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public saveRace(records: EventRaceGuests[]) {
        return this.httpClient.post(`${this.apiController}SaveRace`, records);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }
}
