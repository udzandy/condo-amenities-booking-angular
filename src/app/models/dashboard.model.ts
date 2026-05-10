export interface DashboardSummary {

  totalUsers: number;

  totalBookings: number;

  activeAmenities: number;

  todayBookings: number;

}

export interface RecentBooking {

  bookingId: number;

  userName: string;

  amenityName: string;

  bookingDate: string;

  status: string;

}

export interface AuditLog {

  action: string;

  userName: string;

  details: string;

  createdAt: string;

}