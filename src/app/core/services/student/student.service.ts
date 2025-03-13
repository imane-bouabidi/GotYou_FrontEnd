import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';
import {Observable} from 'rxjs';
import {Request} from '../../models/Request.model';
import {AuthService} from '../auth/auth.service';
import {Student} from '../../models/Student.model';

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

  getStudentById(id: number): Observable<Student>{
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`, { headers });
  }
}
