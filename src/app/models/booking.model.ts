export interface Booking {
  bookingId: number;
  amenityName: string;
  userName: string;
  unitName: string;
  bookingDate: string;
  timeSlot: string;
  status: string;
  canCancel: boolean;
}

export interface TimeSlot {
  slotId: number;
  time: string;
  available: boolean;
  isBooked: boolean;
}

export interface AmenityUnit {
  unitId: number;
  name: string;
  slots: TimeSlot[];
}

export interface BookedSlot {
  unit: string;
  time: string;
}

export interface AmenityBookingConfig {
  amenityId: number;
  title: string;
  unitsLabel: string;
  units: AmenityUnit[];
  bookedSlots: Record<string, BookedSlot[]>;
}