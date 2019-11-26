import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardDetail } from 'src/app/models/card-detail';

@Injectable(
{providedIn:'root'}
)

export class CardDetailService
{
    url = localStorage.getItem('ServerUrl');
    constructor(private http : HttpClient)
    {
    }
    getCardDetails(customerID): Observable<CardDetail[]>
    {
        return this.http.get<CardDetail[]>(`${this.url}card/getcards?customerID=${customerID}`)
    }
}