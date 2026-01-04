import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  amenities = [
    { name: 'BBQ', price: '$20 / Day', image: 'assets/images/bbq.jpg', route: 'bbq' },
    { name: 'Function Room', price: '$30 / Day', image: 'assets/images/function-room.jpg', route: 'function-room' },
    { name: 'Tennis Court', price: '$10 / Day', image: 'assets/images/tennis-court.jpg', route: 'tennis-court' }
  ];

  constructor(private router: Router) {}

  goToBooking(route: string) {
    this.router.navigate(['/booking', route]);
  }
}

