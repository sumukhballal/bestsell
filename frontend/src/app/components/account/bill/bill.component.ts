import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { BillService } from '../../../services/Bill/bill.service'
import { Bill } from 'src/app/models/bill';
import { element } from 'protractor';

@Component({
  selector: 'bill-account',
  templateUrl: './bill.component.html'
})
export class BillComponent implements OnInit {

    user: Customer;
    bill: Bill[];
  constructor(private billService : BillService) { };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.onSelectBill(this.user.CustomerId); 
    console.log(this.user)
  }

  onSelectBill(user)
  {
    this.billService.getBill(user).subscribe(
      b =>
      {
        b.forEach(element => element.DateString=element.Date.toString().substring(0,10))
        this.bill=b as Bill[];
      }
    )
  }

}
