import { Injectable } from '@angular/core';

export interface Booking {
  amenity: string;
  date: string;    // YYYY-MM-DD
  unit: string;    // Pit / Room / Court
  time: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {

  // Structure:
  // bookings[amenity][date] = [{ unit, time }]
//   private bookings: any = {};
  private bookings: Booking[] = [];

//   saveBooking(amenity: string, date: string, booking: any) {
//     if (!this.bookings[amenity]) {
//       this.bookings[amenity] = {};
//     }

//     if (!this.bookings[amenity][date]) {
//       this.bookings[amenity][date] = [];
//     }

//     this.bookings[amenity][date].push(booking);
//   }

  // Save booking
  saveBooking(booking: Booking) {
    this.bookings.push(booking);
  }

  // Get bookings for the current account (single user for now)
  getMyBookings(): Booking[] {
    return this.bookings.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  // Check if booking can be cancelled (3 days prior)
  canCancel(booking: Booking): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 3; // can cancel if 3 or more days left
  }

  // Cancel booking
  cancelBooking(booking: Booking) {
    this.bookings = this.bookings.filter(
      b =>
        !(b.amenity === booking.amenity &&
          b.date === booking.date &&
          b.unit === booking.unit &&
          b.time === booking.time)
    );
  }

  // Get all bookings for a specific amenity
  getAllBookingsForAmenity(amenity: string): Booking[] {
    return this.bookings.filter(b => b.amenity === amenity);
  }


  // Check if a slot is already booked
  isBooked(amenity: string, date: string, unit: string, time: string): boolean {
    return this.bookings.some(
      b => b.amenity === amenity && b.date === date && b.unit === unit && b.time === time
    );
  }

  // ===========================
  // BOOKING LIMIT RULES
  // ===========================

  canBook(
    amenity: string,
    selectedDate: Date
  ): { allowed: boolean; message?: string } {

    const allBookings = this.getAllBookingsForAmenity(amenity);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const week = this.getWeekNumber(selectedDate);

    let count = 0;

    for (const dateStr in allBookings) {
      const date = new Date(dateStr);

      if (amenity === 'bbq' || amenity === 'function-room') {
        if (
          date.getFullYear() === year &&
          date.getMonth() === month
        ) {
        //   count += allBookings[dateStr].length;
            count++;
        }
      }

      if (amenity === 'tennis-court') {
        if (
          this.getWeekNumber(date) === week &&
          date.getFullYear() === year
        ) {
        //   count += allBookings[dateStr].length;
          count++;
        }
      }
    }

    // -------------------------
    if (amenity === 'bbq' && count >= 1) {
      return {
        allowed: false,
        message: 'You can book only ONE BBQ pit per month.'
      };
    }

    if (amenity === 'function-room' && count >= 1) {
      return {
        allowed: false,
        message: 'You can book only ONE function room per month.'
      };
    }

    if (amenity === 'tennis-court' && count >= 1) {
      return {
        allowed: false,
        message: 'You can book only ONE tennis court slot per week.'
      };
    }

    return { allowed: true };
  }

  // ---------------------------
  private getWeekNumber(date: Date): number {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const diff = (date.getTime() - firstDay.getTime()) / 86400000;
    return Math.ceil((diff + firstDay.getDay() + 1) / 7);
  }
  
}
