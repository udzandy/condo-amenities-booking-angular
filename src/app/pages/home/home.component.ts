import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
amenities = [
    {
      name: 'BBQ',
      price: '$20 / Day',
      image: 'assets/images/bbq.jpg'
      // image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'
    },
    {
      name: 'Function Room',
      price: '$30 / Day',
      image: 'assets/images/function-room.jpg'
      // image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    },
    {
      name: 'Tennis Court',
      price: '$10 / Day',
      image: 'assets/images/tennis-court.jpg'
    },
    // {
    //   name: 'Gym',
    //   price: 'No Fee',
    //   image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1'
    // },
    // {
    //   name: 'Rooftop Patio',
    //   price: 'No Fee',
    //   image: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1'
    // }
  ];

}
