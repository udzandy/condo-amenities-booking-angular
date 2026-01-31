import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  //{ path: '**', redirectTo: 'login' },
  // { path: '', component: HomeComponent },
  { path: 'amenities', component: HomeComponent },
  { path: 'booking/:amenity', component: BookingComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
