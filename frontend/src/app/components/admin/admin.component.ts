import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-tasks',
    templateUrl: './admin.component.html'
  })
export class AdminComponent implements OnInit{
    adminTasks:string[];
ngOnInit()
{
this.adminTasks=['Add New User','Edit Users','Update Shipping Info','Reorder Products?']
}
}

