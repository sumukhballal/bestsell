
import { CartProduct } from 'src/app/models/cart-product';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CheckoutService } from '../../../services/Checkout/checkout.service';
import { OrderDetail } from 'src/app/models/order-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-final',
  templateUrl: './payment-final.component.html',
  styleUrls: ['./payment-final.component.scss']
})
export class PaymentFinalComponent implements OnInit {

  customerInfor: Customer = new Customer();
  cart: CartProduct[];
  orderDetail:OrderDetail;
  paymentType: String[]
  constructor( private checkoutService: CheckoutService,private router:Router) { } 

  
  ngOnInit() {
    this.customerInfor = JSON.parse(localStorage.getItem('user'));
    this.cart=JSON.parse(localStorage.getItem('Cart'))
    this.paymentType=['Credit Card','Debit Card','Paypal']
  }

  onPayment()
  {
    this.checkoutService.createOrderTransaction(this.orderDetail).subscribe(
      (data) => {
          this.router.navigate(['/products'])
      },
      (error) => console.log("Payment did not go through")
    );
  }




  
}
