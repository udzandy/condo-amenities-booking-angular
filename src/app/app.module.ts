import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AmenityCardComponent } from './components/amenity-card/amenity-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingConfirmDialogComponent } from '../app/components/booking-confirm-dialog/booking-confirm-dialog.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationSuccessDialogComponent } from './components/registration-success-dialog/registration-success-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    AmenityCardComponent,
    SearchBarComponent,
    BookingComponent,
    BookingConfirmDialogComponent,
    MyBookingsComponent,
    ConfirmDialogComponent,
    RegistrationComponent,
    RegistrationSuccessDialogComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
