import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGuests, IVWGuests } from '../Models/guest.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class GuestService {
    public apiController = 'api/Guests/';
    constructor(private httpClient: HttpClient) {

    }

  public getGuests(): Observable<Array<IGuests>> {
    return this.httpClient.get<Array<IGuests>>(`${this.apiController}GetGuests`);
    }

  public getActiveGuests():Observable<IGuests[]> {
    return this.httpClient.get<IGuests[]>(`${this.apiController}GetActiveGuests`);
    }

  public getNotActiveGuests(): Observable<IGuests[]> {
    return this.httpClient.get<IGuests[]>(`${this.apiController}GetNotActiveGuests`);
    }

  public getGuest(id: number): Observable<IVWGuests> {
    return this.httpClient.get<IVWGuests>(`${this.apiController}GetGuest/${id}`);
    }

    public save(record: IGuests) {
        return this.httpClient.post(`${this.apiController}Save`, record);
    }

    public delete(id: number) {
        return this.httpClient.delete(`${this.apiController}Delete/${id}`);
    }

    public setIsActive(id: number, isActive: boolean) {
        return this.httpClient.post(`${this.apiController}SetIsActive`, { id: id, isActive: isActive });
    }

    public resetIsActiveAll() {
        return this.httpClient.post(`${this.apiController}ResetIsActiveAll`, {});
    }
    
}
