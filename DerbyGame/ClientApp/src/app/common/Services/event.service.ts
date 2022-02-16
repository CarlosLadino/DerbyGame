import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events, IVWEvents } from '../Models/event.model';
import { Observable } from 'rxjs';
import { VwEventGuestTotals } from '../Models/eventRace.model';

@Injectable({
    providedIn: 'root',
})

export class EventService {
    public apiController = 'api/Events/';
    constructor(private httpClient: HttpClient) {

    }

  public getEvents(): Observable<IVWEvents[]>{
    return this.httpClient.get<IVWEvents[]>(`${this.apiController}GetEvents`);
    }

  public getActive():Observable<Events> {
    return this.httpClient.get<Events>(`${this.apiController}GetActive`);
    }

  public getEvent(id: number): Observable<Events> {
    return this.httpClient.get<Events>(`${this.apiController}GetEvent/${id}`);
    }

    public save(record: Events) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }

    public setActive(id: number, active: boolean) {
        return this.httpClient.post(`${this.apiController}SetActive`, { id: id, active: active, name: 'temp', eventDate: new Date() });
    }

  public getTotalsById(id: number): Observable<Array<VwEventGuestTotals>> {
    return this.httpClient.get<Array<VwEventGuestTotals>>(`${this.apiController}GetTotalsById/${id}`);
    }
}
