import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../../components/registration-success-dialog/registration-success-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { RegisterUser } from '../../models/register-user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  isAdminRole = false;
  isLoggedIn = false;
  userId = '';

  // constructor(private fb: FormBuilder, private dialog: MatDialog) {
  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private authService: AuthService,
              private snackBar: MatSnackBar,
            private service: RegistrationService) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        estateName: ['', Validators.required],
        block: ['', Validators.required],
        floor: ['', Validators.required],
        unitNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        userType: ['Tenant', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
    
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdminRole = this.authService.getRole() === "Admin";
    this.userId = this.authService.getUserId();

    if (this.isLoggedIn && !this.isAdminRole)
    {
      this.loadUserInfo();
    }

  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // submit() {
  //   if (this.registrationForm.invalid) {
  //     this.registrationForm.markAllAsTouched();
  //     return;
  //   }

  //   const firstName = this.registrationForm.value.firstName;

  //   this.dialog.open(RegistrationSuccessDialogComponent, {
  //     width: '450px',
  //     disableClose: true,
  //     data: { firstName }
  //   });
  // }

  submit() {

    if (this.registrationForm.invalid) {

      this.registrationForm.markAllAsTouched();

      return;
    }

    const formValue = this.registrationForm.value;

    const registerData: RegisterUser = {

      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      mobile: formValue.mobile,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      estateName: formValue.estateName,
      block: formValue.block,
      floor: formValue.floor,
      unitNumber: formValue.unitNumber,
      postalCode: formValue.postalCode,
      userType: formValue.userType

    };

    // CALL BACKEND API
    this.authService.register(registerData)
      .subscribe({

        next: (response) => {

          console.log(response);

          const firstName = formValue.firstName;

          // SUCCESS DIALOG
          this.dialog.open(
            RegistrationSuccessDialogComponent,
            {
              width: '450px',
              disableClose: true,
              data: { firstName }
            });

          // CLEAR FORM
          this.registrationForm.reset();

        },
        error: (err) => {

          console.log(err);

          // this.snackBar.open(
          //   'Registration failed',
          //   '',
          //   {
          //     duration: 3000
          //   });

            this.snackBar.open(
            err.error.message || err.message,
            '',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
        }

      });
  }

  updateUser()
  {

  }

  loadUserInfo(): void {
    //this.loading = true;
    this.service.getUsers(this.userId).subscribe({
      next: (response: any) => {
        console.log(response);

        this.registrationForm.patchValue({

          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          mobile: response.mobile,
          password: response.password,
          confirmPassword: response.password,
          estateName: response.estateName,
          block: response.block,
          floor: response.floor,
          unitNumber: response.unitNumber,
          postalCode: response.postalCode,
          userType: response.userType

        });
      },
      error: (error: any) => {
        console.error('Load users error:', error);
        // this.loading = false;
      }
    });

  }



}
