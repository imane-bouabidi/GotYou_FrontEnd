import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';
import {Observable} from 'rxjs';
import {Request} from '../../models/Request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = "http://localhost:8080/gotYou/api";

  constructor(private http: HttpClient, private router: Router) {}

  getStudentById(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/students`);
  }


  getStudentRequests(): Observable<Request[]>{
    return this.http.get<Request[]>(`${this.apiUrl}/requests/student`);
  }
}
