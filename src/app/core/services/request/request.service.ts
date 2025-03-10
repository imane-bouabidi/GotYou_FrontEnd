import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {CreateRequestDto} from '../../models/dtos/CreateRequestDto.models';
import {Student} from '../../models/Student.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/gotYou/api/requests';
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  save(request: CreateRequestDto): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student>(`${this.userApiUrl}/current`, { headers }).pipe(
      switchMap((student: Student) => {
        request.studentId = student.id;
        console.log(request.studentId);
        return this.http.post<any>(`${this.apiUrl}`, request, { headers });
      })
    );
  }
}
