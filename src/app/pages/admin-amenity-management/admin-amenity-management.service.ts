import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAmenityConfigService {

  private apiUrl =
    'https://localhost:7288/api/admin/amenities';

  constructor(private http: HttpClient) {}

  // =========================
  // AMENITIES
  // =========================

  getAmenities(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}`
    );

  }

  createAmenity(payload: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}`,
      payload
    );

  }

  updateAmenity(id: number, payload: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      payload
    );

  }

  deleteAmenity(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  // =========================
  // UNITS
  // =========================

  createUnit(payload: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/units`,
      payload
    );

  }

  updateUnit(id: number, payload: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/units/${id}`,
      payload
    );

  }

  deleteUnit(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/units/${id}`
    );

  }

  // =========================
  // TIME SLOTS
  // =========================

  createSlot(payload: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/slots`,
      payload
    );

  }

  updateSlot(id: number, payload: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/slots/${id}`,
      payload
    );

  }

  deleteSlot(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/slots/${id}`
    );

  }
}
