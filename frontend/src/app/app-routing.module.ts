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
  { path : 'customer/my-account/my-bills',component: BillComponent,data:{title:"Customer Bills"}},
  { path: 'customer/my-account', component: AccountComponent,data:{title:"Customer Information"}},
  { path : 'my-bills/:id',component: BillComponent,data:{title:"Customer Bills"}},
  { path: 'customer/login', component: LoginComponent},
  { path: 'customer/register', component: RegisterComponent},
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
