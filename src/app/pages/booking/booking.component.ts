// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.scss']
// })
// export class BookingComponent implements OnInit {

//   amenity!: string;
//   selectedDate: Date | null = null;
//   currentAmenity: any;

//   amenityConfig: any = {

//     bbq: {
//       title: 'BBQ Booking',
//       unitsLabel: 'Pit',
//       units: [
//         { name: 'Pit 1', slots: [
//           { time: '09:00 AM - 04:00 PM', available: true },
//           { time: '05:00 PM - 10:00 PM', available: true }
//         ]},
//         { name: 'Pit 2', slots: [
//           { time: '09:00 AM - 04:00 PM', available: true },
//           { time: '05:00 PM - 10:00 PM', available: true }
//         ]}
//       ],
//       bookedSlots: {
//         '2026-01-07': [
//           { unit: 'Pit 1', time: '09:00 AM - 04:00 PM' },
//           { unit: 'Pit 1', time: '05:00 PM - 10:00 PM' },
//           { unit: 'Pit 2', time: '09:00 AM - 04:00 PM' }
//         ],
//         '2026-01-08': [
//           { unit: 'Pit 1', time: '09:00 AM - 04:00 PM' },
//           { unit: 'Pit 1', time: '05:00 PM - 10:00 PM' },
//           { unit: 'Pit 2', time: '09:00 AM - 04:00 PM' },
//           { unit: 'Pit 2', time: '05:00 PM - 10:00 PM' }
//         ]
//       }
//     },

//     'function-room': {
//       title: 'Function Room Booking',
//       unitsLabel: 'Room',
//       units: [
//         { name: 'Room A', slots: [
//           { time: '09:00 AM - 01:00 PM', available: true },
//           { time: '02:00 PM - 06:00 PM', available: false },
//           { time: '07:00 PM - 11:00 PM', available: true }
//         ]}
//       ],
//       bookedSlots: {
//         '2026-01-07': [
//           { unit: 'Room A', time: '09:00 AM - 01:00 PM' },
//           { unit: 'Room A', time: '02:00 PM - 06:00 PM' }
//         ],
//         '2026-01-10': [
//           { unit: 'Room A', time: '09:00 AM - 01:00 PM' },
//           { unit: 'Room A', time: '02:00 PM - 06:00 PM' },
//           { unit: 'Room A', time: '07:00 PM - 11:00 PM' }
//         ]
//       }
//     },

//     'tennis-court': {
//       title: 'Tennis Court Booking',
//       unitsLabel: 'Court',
//       units: [
//         { name: 'Court 1', slots: [
//           { time: '07:00 AM - 08:00 AM', available: true },
//           { time: '08:00 AM - 09:00 AM', available: false },
//           { time: '09:00 AM - 10:00 AM', available: false },
//           { time: '10:00 AM - 11:00 AM', available: false },
//           { time: '11:00 AM - 12:00 PM', available: false },
//           { time: '12:00 PM - 01:00 PM', available: false },
//           { time: '01:00 PM - 02:00 PM', available: false },
//           { time: '02:00 PM - 03:00 PM', available: false },
//           { time: '03:00 PM - 04:00 PM', available: false },
//           { time: '04:00 PM - 05:00 PM', available: false },
//           { time: '05:00 PM - 06:00 PM', available: false },
//           { time: '06:00 PM - 07:00 PM', available: false },
//           { time: '07:00 PM - 08:00 PM', available: false },
//           { time: '08:00 PM - 09:00 PM', available: false },
//           { time: '09:00 PM - 10:00 PM', available: false }
//         ]}
//       ],
//       bookedSlots: {
//         '2026-01-08': [
//           { unit: 'Court 1', time: '09:00 AM - 10:00 AM' },
//           { unit: 'Court 1', time: '02:00 PM - 03:00 PM' }
//         ],
//         '2026-01-11': [
//           { unit: 'Court 1', time: '08:00 AM - 09:00 AM' },
//           { unit: 'Court 1', time: '10:00 AM - 11:00 AM' },
//           { unit: 'Court 1', time: '07:00 PM - 08:00 PM' }
//         ],
//         '2026-01-20': [
//           { unit: 'Court 1', time: '07:00 AM - 08:00 AM' },
//           { unit: 'Court 1', time: '08:00 AM - 09:00 AM' },
//           { unit: 'Court 1', time: '09:00 AM - 10:00 AM' },
//           { unit: 'Court 1', time: '10:00 AM - 11:00 AM' },
//           { unit: 'Court 1', time: '11:00 AM - 12:00 PM' },
//           { unit: 'Court 1', time: '12:00 PM - 01:00 PM' },
//           { unit: 'Court 1', time: '01:00 PM - 02:00 PM' },
//           { unit: 'Court 1', time: '02:00 PM - 03:00 PM' },
//           { unit: 'Court 1', time: '03:00 PM - 04:00 PM' },
//           { unit: 'Court 1', time: '04:00 PM - 05:00 PM' },
//           { unit: 'Court 1', time: '05:00 PM - 06:00 PM' },
//           { unit: 'Court 1', time: '06:00 PM - 07:00 PM' },
//           { unit: 'Court 1', time: '07:00 PM - 08:00 PM' },
//           { unit: 'Court 1', time: '08:00 PM - 09:00 PM' },
//           { unit: 'Court 1', time: '09:00 PM - 10:00 PM' }
//         ]
//       }
//     }
//   };

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.amenity = this.route.snapshot.paramMap.get('amenity')!;
//     this.currentAmenity = this.amenityConfig[this.amenity];

//     // Initialize selectedDate as today
//     this.selectedDate = new Date();
//   }

//   // Filter for mat-calendar: disables previous dates and fully booked dates
//   dateFilter = (date: Date | null): boolean => {
//     if (!date) return false;

//     const today = new Date();
//     today.setHours(0,0,0,0);

//     if (date < today) return false;

//     const dateStr = date.toISOString().split('T')[0];
//     const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];

//     const allSlots = this.currentAmenity.units.flatMap((unit: any) =>
//       unit.slots.map((slot: any) => ({ unit: unit.name, time: slot.time }))
//     );

//     // if all slots booked → disable date
//     return bookedSlots.length < allSlots.length;
//   };

//   onDateSelected(date: Date | null) {
//     if (date) this.selectedDate = date;
//   }

//   // Check if a slot is booked for selectedDate
//   isSlotBooked(date: Date | null, unitName: string, slotTime: string): boolean {
//     if (!date) return true;

//     const dateStr = date.toISOString().split('T')[0];
//     const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];

//     return bookedSlots.some((b: any) => b.unit === unitName && b.time === slotTime);
//   }

//   // Highlight fully booked dates only
//   dateClass = (date: Date) => {
//     const dateStr = date.toISOString().split('T')[0];
//     const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];
//     const allSlots = this.currentAmenity.units.flatMap((unit: any) =>
//       unit.slots.map((slot: any) => ({ unit: unit.name, time: slot.time }))
//     );

//     if (bookedSlots.length === allSlots.length) {
//       return 'fully-booked-date';
//     }

//     return '';
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  amenity!: string;
  selectedDate: Date | null = null;
  currentAmenity: any;

  amenityConfig: any = {

    bbq: {
      title: 'BBQ Booking',
      unitsLabel: 'Pit',
      units: [
        { name: 'Pit 1', slots: [
          { time: '09:00 AM - 04:00 PM', available: true },
          { time: '05:00 PM - 10:00 PM', available: true }
        ]},
        { name: 'Pit 2', slots: [
          { time: '09:00 AM - 04:00 PM', available: true },
          { time: '05:00 PM - 10:00 PM', available: true }
        ]}
      ],
      bookedSlots: {
        '2026-01-07': [
          { unit: 'Pit 1', time: '09:00 AM - 04:00 PM' },
          { unit: 'Pit 1', time: '05:00 PM - 10:00 PM' },
          { unit: 'Pit 2', time: '09:00 AM - 04:00 PM' }
        ],
        '2026-01-08': [
          { unit: 'Pit 1', time: '09:00 AM - 04:00 PM' },
          { unit: 'Pit 1', time: '05:00 PM - 10:00 PM' },
          { unit: 'Pit 2', time: '09:00 AM - 04:00 PM' },
          { unit: 'Pit 2', time: '05:00 PM - 10:00 PM' }
        ]
      }
    },

    'function-room': {
      title: 'Function Room Booking',
      unitsLabel: 'Room',
      units: [
        { name: 'Room A', slots: [
          { time: '09:00 AM - 01:00 PM', available: true },
          { time: '02:00 PM - 06:00 PM', available: false },
          { time: '07:00 PM - 11:00 PM', available: true }
        ]}
      ],
      bookedSlots: {
        '2026-01-07': [
          { unit: 'Room A', time: '09:00 AM - 01:00 PM' },
          { unit: 'Room A', time: '02:00 PM - 06:00 PM' }
        ],
        '2026-01-10': [
          { unit: 'Room A', time: '09:00 AM - 01:00 PM' },
          { unit: 'Room A', time: '02:00 PM - 06:00 PM' },
          { unit: 'Room A', time: '07:00 PM - 11:00 PM' }
        ]
      }
    },

    'tennis-court': {
      title: 'Tennis Court Booking',
      unitsLabel: 'Court',
      units: [
        { name: 'Court 1', slots: [
          { time: '07:00 AM - 08:00 AM', available: true },
          { time: '08:00 AM - 09:00 AM', available: false },
          { time: '09:00 AM - 10:00 AM', available: false },
          { time: '10:00 AM - 11:00 AM', available: false },
          { time: '11:00 AM - 12:00 PM', available: false },
          { time: '12:00 PM - 01:00 PM', available: false },
          { time: '01:00 PM - 02:00 PM', available: false },
          { time: '02:00 PM - 03:00 PM', available: false },
          { time: '03:00 PM - 04:00 PM', available: false },
          { time: '04:00 PM - 05:00 PM', available: false },
          { time: '05:00 PM - 06:00 PM', available: false },
          { time: '06:00 PM - 07:00 PM', available: false },
          { time: '07:00 PM - 08:00 PM', available: false },
          { time: '08:00 PM - 09:00 PM', available: false },
          { time: '09:00 PM - 10:00 PM', available: false }
        ]}
      ],
      bookedSlots: {
        '2026-01-08': [
          { unit: 'Court 1', time: '09:00 AM - 10:00 AM' },
          { unit: 'Court 1', time: '02:00 PM - 03:00 PM' }
        ],
        '2026-01-11': [
          { unit: 'Court 1', time: '08:00 AM - 09:00 AM' },
          { unit: 'Court 1', time: '10:00 AM - 11:00 AM' },
          { unit: 'Court 1', time: '07:00 PM - 08:00 PM' }
        ],
        '2026-01-20': [
          { unit: 'Court 1', time: '07:00 AM - 08:00 AM' },
          { unit: 'Court 1', time: '08:00 AM - 09:00 AM' },
          { unit: 'Court 1', time: '09:00 AM - 10:00 AM' },
          { unit: 'Court 1', time: '10:00 AM - 11:00 AM' },
          { unit: 'Court 1', time: '11:00 AM - 12:00 PM' },
          { unit: 'Court 1', time: '12:00 PM - 01:00 PM' },
          { unit: 'Court 1', time: '01:00 PM - 02:00 PM' },
          { unit: 'Court 1', time: '02:00 PM - 03:00 PM' },
          { unit: 'Court 1', time: '03:00 PM - 04:00 PM' },
          { unit: 'Court 1', time: '04:00 PM - 05:00 PM' },
          { unit: 'Court 1', time: '05:00 PM - 06:00 PM' },
          { unit: 'Court 1', time: '06:00 PM - 07:00 PM' },
          { unit: 'Court 1', time: '07:00 PM - 08:00 PM' },
          { unit: 'Court 1', time: '08:00 PM - 09:00 PM' },
          { unit: 'Court 1', time: '09:00 PM - 10:00 PM' }
        ]
      }
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.amenity = this.route.snapshot.paramMap.get('amenity')!;
    this.currentAmenity = this.amenityConfig[this.amenity];

    // Initialize selectedDate as today
    this.selectedDate = new Date();
  }

  // -------------------
  // HELPER: format date to YYYY-MM-DD in LOCAL time (avoids timezone shift)
  formatDateLocal(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // -------------------
  // Filter for mat-calendar: disables previous dates and fully booked dates
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0,0,0,0);

    if (date < today) return false;

    const dateStr = this.formatDateLocal(date);
    const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];

    const allSlots = this.currentAmenity.units.flatMap((unit: any) =>
      unit.slots.map((slot: any) => ({ unit: unit.name, time: slot.time }))
    );

    return bookedSlots.length < allSlots.length;
  };

  // -------------------
  onDateSelected(date: Date | null) {
    if (date) this.selectedDate = date;
  }

  // -------------------
  // Check if a slot is booked for selectedDate
  isSlotBooked(date: Date | null, unitName: string, slotTime: string): boolean {
    if (!date) return true;

    const dateStr = this.formatDateLocal(date);
    const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];

    return bookedSlots.some((b: any) => b.unit === unitName && b.time === slotTime);
  }

  // -------------------
  // Highlight fully booked dates only
  dateClass = (date: Date) => {
    const dateStr = this.formatDateLocal(date);
    const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];
    const allSlots = this.currentAmenity.units.flatMap((unit: any) =>
      unit.slots.map((slot: any) => ({ unit: unit.name, time: slot.time }))
    );

    if (bookedSlots.length === allSlots.length) {
      return 'fully-booked-date';
    }

    return '';
  }
}




