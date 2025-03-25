import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Request } from '../../models/Request.model';
import { Student } from '../../models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = "http://localhost:8080/gotYou/api";

  constructor(private http: HttpClient, private router: Router) {}

  getStudentRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests/student`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }
}
