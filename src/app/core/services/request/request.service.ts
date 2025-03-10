import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {CreateRequestDto} from '../../models/dtos/CreateRequestDto.models';
import {Student} from '../../models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/gotYou/api/requests';
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';

  constructor(private http: HttpClient) {}

  save(request: CreateRequestDto): Observable<Request> {
    return this.http.get<Student>(`${this.userApiUrl}/current`).pipe(
      switchMap(student => {
        request.student = student;
        return this.http.post<Request>(`${this.apiUrl}/student`, request);
      })
    );
  }
}
