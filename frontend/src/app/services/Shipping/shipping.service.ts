import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShippingRegion } from 'src/app/models/shipping-region';
import { Observable } from 'rxjs';
import { Shipping } from 'src/app/models/shipping';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getShippingRegions(): Observable<ShippingRegion[]>{
    return this.http.get<ShippingRegion[]>(`${this.url}shipping/getShippingRegions`);
  }

  getShippingDetails(orderId: number) : Observable<Shipping[]>
  {
    return this.http.get<Shipping[]>(`${this.url}shipping/getShippingDetails?orderId=${orderId}`)
  }

}
