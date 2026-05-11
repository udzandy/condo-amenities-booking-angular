import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAmenityManagementService {

  private apiUrl = 'https://localhost:7288/api/admin/amenities';

  constructor(private http: HttpClient) {}

  // =========================================================
  // AMENITIES
  // =========================================================

  getAmenities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAmenities`);
  }

  createAmenity(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAmenity`, payload);
  }

  updateAmenity(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateAmenity/${id}`, payload);
  }

  deleteAmenity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteAmenity/${id}`);
  }

  // =========================================================
  // UNITS
  // =========================================================

  getUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getUnits`);
  }

  createUnit(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUnit`, payload);
  }

  updateUnit(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateUnit/${id}`, payload);
  }

  deleteUnit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUnit/${id}`);
  }

  // =========================================================
  // SLOTS
  // =========================================================

  getSlots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getSlots`);
  }

  createSlot(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createSlot`, payload);
  }

  updateSlot(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateSlot/${id}`, payload);
  }

  deleteSlot(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteSlot/${id}`);
  }
}
