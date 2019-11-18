import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

 
  customerInfor: Customer = new Customer();
  constructor() { }

  ngOnInit() {
    this.customerInfor = JSON.parse(localStorage.getItem('user'));
  }

}
