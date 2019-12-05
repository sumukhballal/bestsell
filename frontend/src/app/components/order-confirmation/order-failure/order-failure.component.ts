import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component(
    {
        selector: 'order-failure',
        templateUrl: './order-detail.component.html'
    }
)
export class OrderFailureComponent implements OnInit{

    customer: Customer;
    ngOnInit()
    {
        this.customer=JSON.parse(localStorage.getItem('user'))
    }
}