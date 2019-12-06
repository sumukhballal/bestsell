import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from 'src/app/models/product-details';
import { ProductService } from 'src/app/services/Product/product.service';
import { Customer } from 'src/app/models/customer';
import { ShippingService } from 'src/app/services/Shipping/shipping.service';
import { Shipping } from 'src/app/models/shipping';


@Component({
selector:'order-detail',
templateUrl:'./orderdetail.component.html',
styleUrls: ['./orderdetail.component.scss']
})

export class OrderDetailComponent implements OnInit{

    orderId : number;
    products: ProductDetails[];
    customer: Customer;
    shipping: Shipping[];
    constructor(private route: ActivatedRoute,private productService:ProductService,
        private shippingService: ShippingService)
    {

    }
    ngOnInit()
    {
        this.route.params.subscribe(params => {
            this.orderId = params['id'];
          })
          this.customer = JSON.parse(localStorage.getItem('user'));
          this.getProducts()
          this.getTrackingNumber()
    }

    getTrackingNumber()
    {
        this.shippingService.getShippingDetails(this.orderId).subscribe(
            p => 
            {
                this.shipping=p
                this.shipping.forEach(element => {
                    if(element.DeliveryStatus==0)
                    {
                        element.DeliveryStatusString="In Transit"
                    }
                    else
                    {
                        element.DeliveryStatusString="Delivered"
                    }
                });
            }
        )
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