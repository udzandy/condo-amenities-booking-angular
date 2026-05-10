import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl =
    'https://localhost:7288/api/admin-dashboard';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/summary`
    );

  }

  getRecentBookings(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/recent-bookings`
    );

  }

  getAuditLogs(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/audit-logs`
    );

  }
}
