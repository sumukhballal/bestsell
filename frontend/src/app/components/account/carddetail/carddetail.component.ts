import { Component,OnInit } from '@angular/core';
import { CardDetailService } from 'src/app/services/Card/card-detail.service';
import { Customer } from 'src/app/models/customer';
import { CardDetail } from 'src/app/models/card-detail';

@Component({
    selector: 'card-detail',
    templateUrl: './carddetail.component.html'
})

export class CardDetailComponent{

    user:Customer;
    cardDetail: CardDetail[];
    constructor(private cardDetailService: CardDetailService){}
    ngOnInit()
    {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
        this.getCards();
    }

    getCards()
    {
        this.cardDetailService.getCardDetails(this.user.CustomerId).subscribe(
            c => {
                this.cardDetail=c;
                this.cardDetail.forEach(element => element.cardName="Sumukh's Credit Card");

                }
        )
    }

    cardNumberEnc(cardNumber : string)
    {
        return "****-****-****-"+cardNumber.substring(12)
    }
}