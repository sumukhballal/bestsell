import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getBill(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.url}billing/getbill`);
  }

}
