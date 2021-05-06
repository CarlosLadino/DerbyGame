import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaceWithdrawnHorses } from '../Models/raceWithdrawnHorse.model';

@Injectable({
    providedIn: 'root',
})

export class RaceWithdrawnHorseService {
    public apiController = 'api/RaceWithdrawnHorses/';
    constructor(private httpClient: HttpClient) {

    }

    public getRaceWithdrawnHorses(raceId: number) {
        return this.httpClient.get(`${this.apiController}GetRaceWithdrawnHorses/${raceId}`);
    }

    public getRaceWithdrawnHorse(id: number) {
        return this.httpClient.get(`${this.apiController}GetRaceWithdrawnHorse/${id}`);
    }

    public save(record: RaceWithdrawnHorses) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }
}
