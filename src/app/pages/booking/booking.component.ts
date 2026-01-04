import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  amenity!: string;
  selectedDate!: string;
  currentAmenity: any;

  amenityConfig: any = {

    bbq: {
      title: 'BBQ Booking',
      unitsLabel: 'Pit',
      units: [
        {
          name: 'Pit 1',
          slots: [
            { time: '09:00 AM - 04:00 PM', available: false },
            { time: '05:00 PM - 10:00 PM', available: true }
          ]
        },
        {
          name: 'Pit 2',
          slots: [
            { time: '09:00 AM - 04:00 PM', available: true },
            { time: '05:00 PM - 10:00 PM', available: true }
          ]
        }
      ]
    },

    'function-room': {
      title: 'Function Room Booking',
      unitsLabel: 'Room',
      units: [
        {
          name: 'Room A',
          slots: [
            { time: '09:00 AM - 01:00 PM', available: true },
            { time: '02:00 PM - 06:00 PM', available: false },
            { time: '07:00 PM - 11:00 PM', available: true }
          ]
        }
      ]
    },

    tennis: {
      title: 'Tennis Court Booking',
      unitsLabel: 'Court',
      units: [
        {
          name: 'Court 1',
          slots: [
            { time: '06:00 AM - 07:00 AM', available: true },
            { time: '07:00 AM - 08:00 AM', available: false }
          ]
        },
        {
          name: 'Court 2',
          slots: [
            { time: '06:00 AM - 07:00 AM', available: true },
            { time: '07:00 AM - 08:00 AM', available: true }
          ]
        }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.amenity = this.route.snapshot.paramMap.get('amenity')!;
    this.currentAmenity = this.amenityConfig[this.amenity];
  }
}
