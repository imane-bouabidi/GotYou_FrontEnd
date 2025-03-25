import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Donation {
  donorName: string;
  amount: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private donationApiUrl = 'http://localhost:8080/gotYou/api/donations';

  constructor(private http: HttpClient) {}

  getDonationsByRequest(requestId: number): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.donationApiUrl}/request/${requestId}`);
  }
}
