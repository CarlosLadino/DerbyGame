import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaceResults } from '../Models/raceResult.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class RaceResultService {
    public apiController = 'api/RaceResults/';
    constructor(private httpClient: HttpClient) {

    }

  public getRaceResults(raceId: number): Observable<RaceResults[]> {
    return this.httpClient.get<RaceResults[]>(`${this.apiController}GetRaceResults/${raceId}`);
    }

    public getRaceResult(id: number) {
        return this.httpClient.get(`${this.apiController}GetRaceResult/${id}`);
    }

    public save(record: RaceResults) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }

  public getRaceResultByRaceId(raceId: number): Observable<RaceResults[]> {
    return this.httpClient.get<RaceResults[]>(`${this.apiController}GetRaceResultByRaceId/${raceId}`);
    }
}
