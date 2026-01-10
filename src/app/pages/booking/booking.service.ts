import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {

  // Structure:
  // bookings[amenity][date] = [{ unit, time }]
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

  // ---------------------------
  getAllBookingsForAmenity(amenity: string) {
    return this.bookings[amenity] || {};
  }


  // ---------------------------
  isBooked(amenity: string, date: string, unit: string, time: string): boolean {
    return (
      this.bookings[amenity]?.[date]?.some(
        (b: any) => b.unit === unit && b.time === time
      ) || false
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
          count += allBookings[dateStr].length;
        }
      }

      if (amenity === 'tennis-court') {
        if (
          this.getWeekNumber(date) === week &&
          date.getFullYear() === year
        ) {
          count += allBookings[dateStr].length;
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
