import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';
import {Observable} from 'rxjs';
import {Request} from '../../models/Request.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = "http://localhost:8080/gotYou/api";

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getStudentRequests(): Observable<Request[]> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Request[]>(`${this.apiUrl}/requests/student`, { headers });
  }
  getStudentById(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/students`);
  }
}
