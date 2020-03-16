import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../Models/event.model';

@Injectable({
    providedIn: 'root',
})

export class EventService {
    public apiController = 'api/Events/';
    constructor(private httpClient: HttpClient) {

    }

    public getEvents() {
        return this.httpClient.get(`${this.apiController}GetEvents`);
    }

    public getActive() {
        return this.httpClient.get(`${this.apiController}GetActive`);
    }

    public getEvent(id: number) {
        return this.httpClient.get(`${this.apiController}GetEvent/${id}`);
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

    public getTotalsById(id: number) {
        return this.httpClient.get(`${this.apiController}GetTotalsById/${id}`);
    }
}
