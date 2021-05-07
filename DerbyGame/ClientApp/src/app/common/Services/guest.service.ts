import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGuests } from '../Models/guest.model';

@Injectable({
    providedIn: 'root',
})

export class GuestService {
    public apiController = 'api/Guests/';
    constructor(private httpClient: HttpClient) {

    }

    public getGuests() {
        return this.httpClient.get(`${this.apiController}GetGuests`);
    }

    public getActiveGuests() {
        return this.httpClient.get(`${this.apiController}GetActiveGuests`);
    }

    public getNotActiveGuests() {
        return this.httpClient.get(`${this.apiController}GetNotActiveGuests`);
    }

    public getGuest(id: number) {
        return this.httpClient.get(`${this.apiController}GetGuest/${id}`);
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
