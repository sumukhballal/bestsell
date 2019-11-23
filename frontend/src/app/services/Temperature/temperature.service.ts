import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temp } from '../../models/temperature';

@Injectable({
    providedIn: 'root'
  })
export class TemperatureService{

 apiKey="c8263bffa5884932f371b7b1deed2677"
 zip="60616"
 tempUrl=`http://api.openweathermap.org/data/2.5/weather?zip=${this.zip},us&APPID=${this.apiKey}`

constructor(private http: HttpClient){}
    getTempData() : Observable<Object>
    {
        return this.http.get<Object>(this.tempUrl)
    }
}