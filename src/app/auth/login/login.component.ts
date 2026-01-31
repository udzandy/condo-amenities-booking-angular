import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private router: Router
  ) {}

  login() {
    const isValid = this.authService.login(this.email, this.password);

    if (isValid) {
      this.router.navigate(['/home']);
    } else {
      alert('Entered email or password incorrect');
      // Do NOT clear fields
    }
  }
}
