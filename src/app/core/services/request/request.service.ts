// src/app/services/request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {CreateRequestDto} from '../../models/dtos/CreateRequestDto.models';
import {Student} from '../../models/Student.model';
import {RequestStatus} from '../../models/enums/request-status.enum';
import {Request} from '../../models/Request.model';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/gotYou/api/requests';
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';
  private adminApiUrl = 'http://localhost:8080/gotYou/api/admin';
  private donationUrl = 'http://localhost:8080/gotYou/api/donations';

  constructor(private http: HttpClient, private authService: AuthService) {}

  save(request: CreateRequestDto): Observable<any> {
    return this.http.get<Student>(`${this.userApiUrl}/current`).pipe(
      switchMap((student: Student) => {
        request.studentId = student.id;
        console.log(request.studentId);
        return this.http.post<any>(`${this.apiUrl}`, request);
      })
    );
  }

  update(request: Request): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${request.id}`, request);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}`);
  }

  getRequestById(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`);
  }

  searchRequests(keyword: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  updateStudentRequestStatus(requestId: number, status: string): Observable<Request> {
    return this.http.put<Request>(`${this.adminApiUrl}/student-requests/status/${requestId}`, status);
  }

  createDonationAndCheckout(requestId: number, amount: number): Observable<string> {
    return this.http.post(
      `${this.donationUrl}/create-donation-and-checkout`,
      null,
      {
        params: { requestId: requestId.toString(), amount: amount.toString() },
        responseType: 'text'
      }
    );
  }
}
