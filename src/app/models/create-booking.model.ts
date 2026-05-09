export interface CreateBookingRequest {
  userId: string;
  amenityId: number;
  startTime: string;
  endTime: string;
}