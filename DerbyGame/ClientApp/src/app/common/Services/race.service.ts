import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVWRaces, Races } from '../Models/race.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class RaceService {
    public apiController = 'api/Races/';
    constructor(private httpClient: HttpClient) {

    }

  public getRaces(): Observable<Array<IVWRaces>> {
    return this.httpClient.get<Array<IVWRaces>>(`${this.apiController}GetRaces`);
    }

  public getRace(id: number): Observable<Races> {
    return this.httpClient.get<Races>(`${this.apiController}GetRace/${id}`);
    }

  public save(record: Races): Observable<Races> {
    return this.httpClient.post<Races>(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }
}
