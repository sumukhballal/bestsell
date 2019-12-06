import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/Inventory/inventory.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventory } from 'src/app/models/inventory';

@Component({
    selector:'inventory',
    templateUrl : './inventory.component.html'
})
export class InventoryComponent implements OnInit{

    storeId: number;
    inventory: Inventory[];
    constructor(private inventoryService : InventoryService,private route: ActivatedRoute)
    {
        this.route.params.subscribe(params => {
            this.storeId = params['id'];
          })
    }
    ngOnInit()
    {
        this.getProductQuantity(this.storeId)
    }

    getProductQuantity(storeId)
    {
        this.inventoryService.getStores(storeId).subscribe(
            p => 
            {
                this.inventory=p
            }
        )
    }
}