import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventRacesList } from '../Models/helperObjects.model';
import { EventRaces, VwEventRace } from '../Models/eventRace.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class EventRaceService {
    public apiController = 'api/EventRaces/';
    constructor(private httpClient: HttpClient) {

    }

    public getEventRacess() {
        return this.httpClient.get(`${this.apiController}GetEventRaces`);
    }

  public getRacesByEventId(id: number): Observable<VwEventRace[]> {
    return this.httpClient.get<VwEventRace[]>(`${this.apiController}GetEventRacesByEventId/${id}`);
    }

  public getNonSelecteRacesByEventId(id: number): Observable<VwEventRace[]> {
    return this.httpClient.get<VwEventRace[]>(`${this.apiController}GetNonSelecteRacesByEventId/${id}`);
    }

  public getSelecteRacesByEventId(id: number): Observable<VwEventRace[]> {
    return this.httpClient.get<VwEventRace[]>(`${this.apiController}GetSelecteRacesByEventId/${id}`);
    }
    
    public getEvent(id: number) {
        return this.httpClient.get(`${this.apiController}GetEventRace/${id}`);
    }

    public save(record: EventRaces) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }

    public saveList(record: EventRacesList) {
        return this.httpClient.post(`${this.apiController}SaveList`, record);
    }

    public setActive(eventId: number, raceId: number) {
        return this.httpClient.post(`${this.apiController}SetActive`, { id: 0, eventId: eventId, raceId: raceId });
    }
}
