import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/models/register-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminRegisteredUsersService {

    private apiUrl = 'https://localhost:7288/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getActiveUsers`);
  }

  createUser(payload: RegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  updateUser(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateAmenity/${id}`, payload);
  }


  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`);
  }

  rejectUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rejectUser/${id}`);
  }

  approveUser(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approveUser?id=${id}`, { });
  }

}