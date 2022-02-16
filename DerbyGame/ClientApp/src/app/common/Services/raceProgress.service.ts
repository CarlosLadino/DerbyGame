import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVWRaceProgress } from '../Models/raceProgress.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class RaceProgressService {
    public apiController = 'api/RaceProgress/';
    constructor(private httpClient: HttpClient) {

    }

  public getRaceProgress(raceId: number): Observable<IVWRaceProgress[]> {
    return this.httpClient.get<IVWRaceProgress[]>(`${this.apiController}GetRaceProgress/${raceId}`);
    }

  public save(record: IVWRaceProgress): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiController}Save`, record);
    }

  public delete(record: IVWRaceProgress){
    return this.httpClient.post(`${this.apiController}Delete`, record);
    }
}
