import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVWRaceProgress } from '../Models/raceProgress.model';

@Injectable({
    providedIn: 'root',
})

export class RaceProgressService {
    public apiController = 'api/RaceProgress/';
    constructor(private httpClient: HttpClient) {

    }

    public getRaceProgress(raceId: number) {
      return this.httpClient.get(`${this.apiController}GetRaceProgress/${raceId}`);
    }

  public save(record: IVWRaceProgress) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(record: IVWRaceProgress) {
      return this.httpClient.post(`${this.apiController}Delete`, record);
    }
}
