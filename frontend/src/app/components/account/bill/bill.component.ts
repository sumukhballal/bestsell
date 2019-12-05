import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { BillService } from '../../../services/Bill/bill.service'
import { Bill } from 'src/app/models/bill';
import { element } from 'protractor';

@Component({
  selector: 'bill-account',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

    user: Customer;
    bill: Bill[];
  constructor(private billService : BillService) { };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.onSelectBill(this.user.CustomerId); 
  }

  onSelectBill(user)
  {
    this.billService.getBill(user).subscribe(
      b =>
      {
        b.forEach(element => {
          element.DateString=element.Date.toString().substring(0,10)
          if(element.OrderStatus==0)
          {
            element.OrderStatusString="In Transit"
          }
          else if(element.StoreId==2)
          {
            element.OrderStatusString="Fulfilled In Store"
          }
          else
          {
            element.OrderStatusString="Delivered"
          }
        });
        this.bill=b as Bill[];
      }
    )
  }

}
