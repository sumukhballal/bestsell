import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temp } from '../../models/temperature';
import { Store } from 'src/app/models/store';

@Injectable({
    providedIn: 'root'
  })
export class StoreService{
    url = localStorage.getItem('ServerUrl');
constructor(private http: HttpClient){}
    getStores() : Observable<Store[]>
    {
        return this.http.get<Store[]>(`${this.url}store/getstores`)
    }
}