import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'condo-amenity-booking-ui';

  userName = '';
  showLayout = true;
  isAdminRole = false;
  
    constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    // this.userName = this.authService.getUserName();
    // this.showLayout = this.authService.isLoggedIn();

    // LISTEN ROUTE CHANGES
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        // CHECK LOGIN PAGE
        const isLoginPage = event.url === '/login';

        // SHOW/HIDE LAYOUT
        this.showLayout = !isLoginPage && this.authService.isLoggedIn();

        // REFRESH USER NAME
        this.userName = this.authService.getUserName();

        this.isAdminRole = this.authService.getRole() === "Admin"
      }

    });

  }

  logout(): void {

    // CLEAR TOKEN + SESSION
    this.authService.logout();

    // HIDE LAYOUT IMMEDIATELY
    this.showLayout = false;

    // REDIRECT LOGIN
    this.router.navigate(['/login']);

  }
}
