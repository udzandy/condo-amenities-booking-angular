import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.userName = this.authService.getUserName();

  }

  logout() {

    this.authService.logout();

    window.location.href = '/login';

  }
}
