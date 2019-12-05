
import { CartProduct } from 'src/app/models/cart-product';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CheckoutService } from '../../../services/Checkout/checkout.service';
import { OrderDetail } from 'src/app/models/order-detail';
import { Router } from '@angular/router';
import { CardDetailService } from 'src/app/services/Card/card-detail.service';
import { CardDetail } from 'src/app/models/card-detail';

@Component({
  selector: 'app-payment-final',
  templateUrl: './payment-final.component.html',
  styleUrls: ['./payment-final.component.scss']
})
export class PaymentFinalComponent implements OnInit {

  customerInfor: Customer = new Customer();
  cart: CartProduct[];
  orderDetail:JSON;
  paymentType: String[];
  cardChosen: String;
  constructor(private cardDetailService: CardDetailService, private checkoutService: CheckoutService,private router:Router) { } 

  
  ngOnInit() {
    this.customerInfor = JSON.parse(localStorage.getItem('user'));
    console.log(this.customerInfor)
    this.cart=JSON.parse(localStorage.getItem('Cart'))
    this.addCards()
    this.paymentType=['Add New Card?']
    this.orderDetail=JSON.parse(localStorage.getItem('OrderDetail'))
  }

  addCards()
  {
      this.cardDetailService.getCardDetails(this.customerInfor.CustomerId).subscribe( 
        p =>
        {
         p.forEach(element => {
           this.cardCut(element.cardNumber)
           this.paymentType.push(element.cardName+" - "+this.cardCut(element.cardNumber))
         });
        }
      )
  }

  cardCut(cardNumber)
  {
    return "****-****-****-"+cardNumber.substring(12,16)
  }

  checkCredit()
  {
    return false;
  }

  onPayment()
  {
    if(this.checkCredit())
      console.log("You have enough credit.")
    else
    {
      console.log("Not enough Credit")
      return;
    }
    this.checkoutService.createOrderTransaction(this.orderDetail).subscribe(
      (data) => {
          this.router.navigate(['/order/order-confirmation'])
      },
      (error) => {
        console.log("Payment did not go through")
        this.router.navigate(['/order/order-failure'])
      },
      () => { console.log("Payment went through. Congrats ")}
      );
  }




  
}
