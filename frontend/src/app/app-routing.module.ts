import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { AccountComponent } from './components/account/account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReviewComponent } from './components/checkout/review/review.component';
import { CustomerInfoComponent } from './components/checkout/customer-info/customer-info.component';
import { PaymentInfoComponent } from './components/checkout/payment-info/payment-info.component';
import { PaymentFinalComponent } from './components/checkout/payment-final/payment-final.component';
import { BillComponent } from './components/account/bill/bill.component';
import { OrderDetailComponent } from './components/account/orderdetail/orderdetail.component';
import { CardDetailComponent } from './components/account/carddetail/carddetail.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditCustomerComponent } from './components/account/edit/editinfo.component';
import { OrderFailureComponent } from './components/order-confirmation/order-failure/order-failure.component';
import { StoreComponent } from './components/admin/stores/store.component';
import { InventoryComponent } from './components/admin/inventory/inventory.component';
import { ReorderComponent } from './components/admin/reorder/reorder.component';


const routes: Routes = [
  // App Routes goes here
  {
    path: 'products',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
    ]
  },
  { path: 'cart/shopping-cart', component: ShoppingCartComponent},
  { path: 'order/order-confirmation', component: OrderConfirmationComponent},
  { path: 'my-account',component:AccountComponent,data:{title:"Customer Account Information"}},
  { path : 'customer/my-account/my-orders',component: BillComponent,data:{title:"Customer Orders"}},
  { path: 'customer/my-account/order-details/:id',component:OrderDetailComponent,data:{title:"Get Order Details"}},
  { path : 'customer/edit-info',component:EditCustomerComponent,data:{title:"Edit Customer Information"}},
  { path: 'customer/my-account/my-cards',component:CardDetailComponent,data:{title:"Get Card Details"}},
  { path: 'customer/my-account', component: AccountComponent,data:{title:"Customer Information"}},
  { path: 'customer/login', component: LoginComponent},
  { path: 'admin/adminTasks',component:AdminComponent},  
  { path: 'admin/stores',component: StoreComponent},
  { path: 'admin/stores/:id',component: InventoryComponent },
  { path: 'admin/reorder',component: ReorderComponent },
  { path: 'customer/register', component: RegisterComponent}, 
  { path: 'order/order-failure',component: OrderFailureComponent},
  { path: 'checkout', component: CheckoutComponent, data: {title: 'Check out'},
    children: [
      { path: 'review',  component: ReviewComponent,  data: {title: 'Order Review'} },
      { path: 'customer-information', component: CustomerInfoComponent,  data: {title: 'Customer Information'} },
      { path: 'payment-information', component: PaymentInfoComponent,  data: {title: 'Payment Information'} },
      { path: 'payment-final', component: PaymentFinalComponent,  data: {title: 'Payment final'} },
    ]
  },
  
   // otherwise redirect to home
   { path: '**', redirectTo: 'products' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
