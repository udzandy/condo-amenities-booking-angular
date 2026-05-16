import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api =
    'https://localhost:7288/api/admin/payment';

  constructor(
    private http: HttpClient
  ) { }

  getAdminPayments() {

    return this.http.get(
      `${this.api}/getPayments`
    );

  }

  payBooking(payload: any) {

    return this.http.post(
      `${this.api}/pay`,
      payload
    );

  }

}