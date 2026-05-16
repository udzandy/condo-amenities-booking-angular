import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterUser } from '../models/register-user.model';
import { RegistrationSuccessDialogComponent } from '../components/registration-success-dialog/registration-success-dialog.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {

  model: any = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    estateName: '',
    block: '',
    floor: '',
    unitNumber: '',
    postalCode: '',
    userType: 'Owner'
};

  // registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private authService: AuthService,
                private snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any
              ) {

                // if (data)
                // {
                //   this.model = {

                //     userId: data.userId,

                //     firstName: data.firstName,

                //     lastName: data.lastName,

                //     email: data.email,

                //     mobile: data.mobile,

                //     password: data.password,

                //     confirmPassword: data.password,

                //     estateName: data.estateName,

                //     block: data.block,

                //     floor: data.floor,

                //     unitNumber: data.unit,

                //     postalCode: data.postalCode,

                //     userType: data.userType

                //   };
                // }
    }

    submit() 
    {
        // if (this.registrationForm.invalid) {
    
        //   this.registrationForm.markAllAsTouched();
    
        //   return;
        // }

        console.log(this.model);

        if (this.model.password != this.model.confirmPassword)
        {
          alert('Passwords do not match');
          return;
        }

        this.dialogRef.close(this.model);
    
      }
}
