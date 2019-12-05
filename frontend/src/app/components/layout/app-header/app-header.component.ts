import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/Shared/data.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { TemperatureService } from '../../../services/Temperature/temperature.service';
import { Temp } from 'src/app/models/temperature';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
   itemCount: number = 0;
  message: string;
  user: Customer;
  Temperature: Temp;
  example: Object;
  isLogged: boolean = false;
  isAdmin : boolean = false;
  constructor(private dataService: DataService,
              private customerService: CustomerService, private temperatureService:TemperatureService ,
              private router: Router) { }

  ngOnInit() {
    this.dataService.count.subscribe(count => this.itemCount = count);
    if(localStorage.getItem('user') == 'undefined'){
      this.user = null;
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user.CustomerId==1)
        this.isAdmin=true;
    }
    this.isLogged = this.user != null;
    this.onCheckTemperature();
  }

  onCheckTemperature()
  {
    this.temperatureService.getTempData().subscribe(
      (data) => { this.example=data }, 
      (err) => console.error(err),
      () => console.log(this.example)
      );
  }

  displayTemp(temp)
  {
    return Math.ceil(temp-273);
  }
  onLogout(){
    this.customerService.Logout().subscribe(a => {
      localStorage.removeItem('user');
      //localStorage.removeItem('Cart')
      this.user = (localStorage.getItem('user') == 'undefined') ? null : JSON.parse(localStorage.getItem('user'));
      this.isLogged = this.user != null;
      window.location.reload();
    });
  }

}
