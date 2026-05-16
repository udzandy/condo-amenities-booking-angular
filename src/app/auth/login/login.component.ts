import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  login() {
    // const isValid = this.authService.login(this.email, this.password);

    // if (isValid) {
    //   this.router.navigate(['/home']);
    // } else {
    //   alert('Entered email or password incorrect');
    //   // Do NOT clear fields
    // }

    this.authService.login(this.email, this.password)
    .subscribe({

      next: (response) => {

        // Navigate by role
        if (response.role === 'Admin') {

          //this.router.navigate(['/admin']);
          this.router.navigate(['/admin-dashboard']);

        } else {

          this.router.navigate(['/home']);
        }

      },

      error: (err) => {

        //alert('Invalid email or password');
        this.snackBar.open(
            err.error.message,
            '',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });

        console.log(err);

      }

    });
  }
}
