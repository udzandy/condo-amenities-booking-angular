// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   // Dummy user (replace with API later)
//   private validUser = {
//     email: 'abc@gmail.com',
//     password: 'aabb#124'
//   };

//   login(email: string, password: string): boolean {
//     return (
//       email === this.validUser.email &&
//       password === this.validUser.password
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterUser } from '../models/register-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Your backend API URL
  private apiUrl = 'https://localhost:7288/api/users';

  constructor(private http: HttpClient) { }

  // LOGIN API
  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    ).pipe(

      // Save token after login success
      tap(response => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('role', response.role);
        localStorage.setItem('name', response.name);

      })
    );
  }

  // LOGOUT
  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

  }

  // CHECK LOGIN
  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  // GET ROLE
  getRole(): string {

    return localStorage.getItem('role') || '';

  }

  // GET USER NAME
  getUserName(): string {

    return localStorage.getItem('name') || '';

  }

  // GET USER ID
  getUserId(): string {

    return localStorage.getItem('userId') || '';

  }

  // REGISTER
  register(user: RegisterUser): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      user
    );

  }
}
