
import { CartProduct } from 'src/app/models/cart-product';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CheckoutService } from '../../../services/Checkout/checkout.service';
import { OrderDetail } from 'src/app/models/order-detail';
import { Router } from '@angular/router';
import { CardDetailService } from 'src/app/services/Card/card-detail.service';
import { CardDetail } from 'src/app/models/card-detail';
import { element } from 'protractor';

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
  cards: CardDetail[];
  newUser: boolean;
  constructor(private cardDetailService: CardDetailService, private checkoutService: CheckoutService,private router:Router) { } 

  
  ngOnInit() {
    this.customerInfor = JSON.parse(localStorage.getItem('user'));
    console.log(this.customerInfor)
    this.cart=JSON.parse(localStorage.getItem('Cart'))
    this.addCards()
    this.paymentType=['']
    if(this.customerInfor==null)
      this.newUser=true;
    
    this.orderDetail=JSON.parse(localStorage.getItem('OrderDetail'))
  }

  addCards()
  {
      this.cardDetailService.getCardDetails(this.customerInfor.CustomerId).subscribe( 
        p =>
        {
          this.cards=p
         p.forEach(element => {
           this.cardCut(element.cardNumber)
           this.paymentType.push(element.cardId+" "+element.cardName+" - "+this.cardCut(element.cardNumber))
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
    var cardChosen=document.getElementById("selectPayment") as HTMLSelectElement
    var CardId=parseInt(cardChosen.options[cardChosen.selectedIndex].value.substring(0,1));
    console.log(this.orderDetail) 
    const CreditUsed=this.cards[0].creditUsed
     const CreditLimit=this.cards[0].creditLimit

     const remainingCredit=CreditLimit-CreditUsed;
     const TotalPrice=3000

     if(remainingCredit>=TotalPrice)
      console.log("Enough credit",remainingCredit)
      else
      console.log("Not eenough credit")
    return false;
  }

  onPayment()
  {
    if(this.checkCredit())
      console.log("You have enough credit.")
    else
    {
      this.router.navigate(['/order/order-failure'])
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

  onCardAdd(){

  }

  removeProductFromInventory()
  {

  }

  addShippingDetails()
  {

  }




  
}
