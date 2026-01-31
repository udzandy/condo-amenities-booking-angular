import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from
  '../../components/registration-success-dialog/registration-success-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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
        unitNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        userType: ['Tenant', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const firstName = this.registrationForm.value.firstName;

    this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { firstName }
    });
  }
}
