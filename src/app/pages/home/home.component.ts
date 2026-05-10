import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Amenity } from 'src/app/models/amenity.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // amenities = [
  //   { name: 'BBQ', price: '$20 / Day', image: 'assets/images/bbq.jpg', route: 'bbq' },
  //   { name: 'Function Room', price: '$30 / Day', image: 'assets/images/function-room.jpg', route: 'function-room' },
  //   { name: 'Tennis Court', price: '$10 / Day', image: 'assets/images/tennis-court.jpg', route: 'tennis-court' }
  // ];

  amenities: Amenity[] = [];

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadAmenities();
  }

  loadAmenities() {
    this.homeService.getHomeAmenities()
      .subscribe({
        next: (data) => {
          this.amenities = data;
        },
        error: (err) => {
          console.error('Error loading amenities', err);
        }
      });
  }

  goToBooking(route: string) {
    this.router.navigate(['/booking', route]);
  }
}

