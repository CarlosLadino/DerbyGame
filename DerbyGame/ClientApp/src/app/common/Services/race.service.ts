import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Races } from '../Models/race.model';

@Injectable({
    providedIn: 'root',
})

export class RaceService {
    public apiController = 'api/Races/';
    constructor(private httpClient: HttpClient) {

    }

    public getRaces() {
        return this.httpClient.get(`${this.apiController}GetRaces`);
    }

    public getRace(id: number) {
        return this.httpClient.get(`${this.apiController}GetRace/${id}`);
    }

    public save(record: Races) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }
}
