import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { Customer } from 'src/app/models/customer';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CollapseComponent } from 'angular-bootstrap-md';

@Component({
    selector: 'edit-customer-info',
    templateUrl: 'edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditCustomerComponent implements OnInit{

    customer: Customer;
    customerId:number;    
    editForm: FormGroup;
    constructor(private customerService: CustomerService,
        private formBuilder: FormBuilder,private router: Router)
    {

    }
    ngOnInit()
    {
        this.customer=JSON.parse(localStorage.getItem('user'))
        this.customerId=this.customer.CustomerId
        this.editForm = this.formBuilder.group({
            AddressOne: [''],
            AddressTwo: ['', null],
            Town: [''],
            Country: [''],
            ZipCode: ['', null],
            Mobile: ['']})
    }

    onSubmit()
    {
        if(this.editForm.invalid)
            return;
        this.customer=this.editForm.value;
        this.customer.CustomerId=this.customerId
        this.customerService.EditCustomer(this.customer).subscribe(
            p =>
            {
                if(p)
                {
                    this.router.navigate(['/'])
                }
            }
        )
        
    }

}