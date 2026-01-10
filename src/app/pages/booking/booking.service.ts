import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private bookings: any = {};

  saveBooking(amenity: string, date: string, booking: any) {
    if (!this.bookings[amenity]) {
      this.bookings[amenity] = {};
    }

    if (!this.bookings[amenity][date]) {
      this.bookings[amenity][date] = [];
    }

    this.bookings[amenity][date].push(booking);
  }

  getBookings(amenity: string, date: string) {
    return this.bookings[amenity]?.[date] || [];
  }

  isBooked(amenity: string, date: string, unit: string, time: string): boolean {
    return this.getBookings(amenity, date)
      .some((b: any) => b.unit === unit && b.time === time);
  }
}
