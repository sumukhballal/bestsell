import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getBill(customerID:number): Observable<Bill[]>{
    return this.http.get<Bill[]>(`${this.url}billing/getbill?customerID=${customerID}`);
  }

}
