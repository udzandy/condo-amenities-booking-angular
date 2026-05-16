import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    private apiUrl = 'https://localhost:7288/api/users';

    constructor(private http: HttpClient) {}

    getUsers(id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getUserById/${id}`);
    }
}