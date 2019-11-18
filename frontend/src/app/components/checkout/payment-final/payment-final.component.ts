
import { CartProduct } from 'src/app/models/cart-product';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-payment-final',
  templateUrl: './payment-final.component.html',
  styleUrls: ['./payment-final.component.scss']
})
export class PaymentFinalComponent implements OnInit {

  customerInfor: Customer = new Customer();
  constructor() { } 

  ngOnInit() {
    this.customerInfor = JSON.parse(localStorage.getItem('user'));
  }


  
}
