import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignupComponent } from './components/pages/signup/signup.component';
//import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'cart-page', component: CartPageComponent },
  //{ path: 'checkout', component: CheckoutPageComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },  // Route for Signup
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  {
    path: 'cart-page',
    component: CartPageComponent,
    canActivate: [AuthGuard]  // Protect this route with AuthGuard
  },
  { path: '**', redirectTo: '' }  // Redirect to home page if the route doesn't exist
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
