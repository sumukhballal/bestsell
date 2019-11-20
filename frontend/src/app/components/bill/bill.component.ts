import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { BillService } from '../../services/Bill/bill.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    user: Customer;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }



}
