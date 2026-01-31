import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Dummy user (replace with API later)
  private validUser = {
    email: 'abc@gmail.com',
    password: 'aabb#124'
  };

  login(email: string, password: string): boolean {
    return (
      email === this.validUser.email &&
      password === this.validUser.password
    );
  }
}
