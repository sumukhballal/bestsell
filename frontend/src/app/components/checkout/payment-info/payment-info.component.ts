import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product';
import { OrderDetail } from 'src/app/models/order-detail';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  checkoutProducts: CartProduct[];
  cart: CartProduct[];
  orderDetail: OrderDetail;
  totalPrice: number = 0;
  nonTaxedPrice: number =0;
  user: Customer;
  date: number;
  tax = 0.064;
  remark: string = '';
  
  constructor() {
    const products = JSON.parse(localStorage.getItem('Cart'));
    this.user=JSON.parse(localStorage.getItem('user'))
    this.checkoutProducts = products;
    products.forEach((product) => {
			this.totalPrice += product.Price * product.Quantity;
    });
    this.nonTaxedPrice=this.totalPrice
  this.totalPrice+=this.totalPrice*this.tax;
  }

  ngOnInit() {
    //this.orderDetail.Cart=products;
    //this.orderDetail.User=JSON.parse(localStorage.getItem('user'))
    
  }

  onCheckout()
  {
    //console.log(this.totalPrice);
    localStorage.setItem('OrderDetail',JSON.stringify({"totalPrice":this.totalPrice,"Cart":this.checkoutProducts,"User":this.user,"Remark":this.remark}))
  }

}
