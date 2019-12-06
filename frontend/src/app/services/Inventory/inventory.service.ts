import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temp } from '../../models/temperature';
import { Store } from 'src/app/models/store';
import { Inventory } from 'src/app/models/inventory';

@Injectable({
    providedIn: 'root'
  })
export class InventoryService{
    url = localStorage.getItem('ServerUrl');
constructor(private http: HttpClient){}
    getStores(storeId : number) : Observable<Inventory[]>
    {
        return this.http.get<Inventory[]>(`${this.url}store/getstoreproducts?StoreId=${storeId}`)
    }
}