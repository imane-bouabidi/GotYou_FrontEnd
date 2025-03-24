import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {CreateRequestDto} from '../../models/dtos/CreateRequestDto.models';
import {Student} from '../../models/Student.model';
import {AuthService} from '../auth/auth.service';
import {Request} from '../../models/Request.model';
import {RequestStatus} from '../../models/enums/request-status.enum';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/gotYou/api/requests';
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';
  private adminApiUrl = 'http://localhost:8080/gotYou/api/admin';
  private donationUrl = 'http://localhost:8080/gotYou/api/donations';

  constructor(private http: HttpClient, private authService: AuthService) {}


  getToken(){
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  save(request: CreateRequestDto): Observable<any> {
    const headers = this.getToken();

    return this.http.get<Student>(`${this.userApiUrl}/current`, { headers }).pipe(
      switchMap((student: Student) => {
          request.studentId = student.id;


        console.log(request.studentId);
        return this.http.post<any>(`${this.apiUrl}`, request, { headers });
      })
    );
  }

  // save(request: CreateRequestDto): Observable<any> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //
  //   return this.http.get<Student>(`${this.userApiUrl}/current`, { headers }).pipe(
  //     switchMap((student: Student) => {
  //       request.student.id = student.id;
  //       console.log(request.student.id);
  //       return this.http.post<any>(`${this.apiUrl}`, request, { headers });
  //     })
  //   );
  // }

  update(request: Request): Observable<any> {
    const headers = this.getToken();
    return this.http.put<any>(`${this.apiUrl}/${request.id}`, request, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = this.getToken();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  getAllRequests():Observable<Request[]>{
    const headers = this.getToken();

    return this.http.get<Request[]>(`${this.apiUrl}`, { headers })
  }

  getRequestById(id: number): Observable<Request> {
    const headers = this.getToken();
    return this.http.get<Request>(`${this.apiUrl}/${id}`, { headers });
  }


  searchRequests(keyword: string): Observable<Request[]> {
    const headers = this.getToken();
    return this.http.get<Request[]>(`${this.apiUrl}/search?keyword=${keyword}`, { headers });
  }

  updateStudentRequestStatus(requestId: number, status: RequestStatus): Observable<Request> {
    const headers = this.getToken();
    return this.http.put<Request>(`${this.adminApiUrl}/student-requests/status/${requestId}`, status, { headers });
  }

  // createCheckoutSession(requestId: number, amount: number): Observable<string> {
  //   const headers = this.getToken();
  //
  //   return this.http.post<string>(`${this.donationUrl}/create-checkout-session`, {
  //     params: { requestId: requestId.toString(), amount: amount.toString() }
  //   }, { headers });
  // }

  createDonationAndCheckout(requestId: number, amount: number): Observable<string> {
    return this.http.post(
      `${this.donationUrl}/create-donation-and-checkout`,
      null,
      {
        headers: this.getToken(),
        params: { requestId: requestId.toString(), amount: amount.toString() },
        responseType: 'text'
      }
    );
  }
}
