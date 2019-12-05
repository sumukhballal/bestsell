import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from 'src/app/models/product-details';
import { ProductService } from 'src/app/services/Product/product.service';
import { Customer } from 'src/app/models/customer';


@Component({
selector:'order-detail',
templateUrl:'./orderdetail.component.html',
styleUrls: ['./orderdetail.component.scss']
})

export class OrderDetailComponent implements OnInit{

    orderId : number;
    products: ProductDetails[];
    customer: Customer;
    constructor(private route: ActivatedRoute,private productService:ProductService)
    {

    }
    ngOnInit()
    {
        this.route.params.subscribe(params => {
            this.orderId = params['id'];
          })
          this.customer = JSON.parse(localStorage.getItem('user'));
          this.getProducts()
    }

    getProducts()
    {
        this.productService.getProductDetailsByOrderId(this.customer.CustomerId,this.orderId).subscribe(
            p => {
                    this.products=p;
            }
        )
    }
}