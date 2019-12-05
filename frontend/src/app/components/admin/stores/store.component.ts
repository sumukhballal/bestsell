import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/Store/store.service';
import { Store } from 'src/app/models/store';

@Component({
    selector:'stores',
    templateUrl : './store.component.html'
})
export class StoreComponent implements OnInit{

    stores: Store[];
    constructor(private storeService: StoreService)
    {

    }
    ngOnInit()
    {
        this.getStores()
    }
    getStores()
    {
        this.storeService.getStores().subscribe(
            p => {
                this.stores=p
                
            }
        )
    }
}