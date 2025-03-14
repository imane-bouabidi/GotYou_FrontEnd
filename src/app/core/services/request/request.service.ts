import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {CreateRequestDto} from '../../models/dtos/CreateRequestDto.models';
import {Student} from '../../models/Student.model';
import {AuthService} from '../auth/auth.service';
import {Request} from '../../models/Request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/gotYou/api/requests';
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}


  getToken(){
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  save(request: CreateRequestDto): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student>(`${this.userApiUrl}/current`, { headers }).pipe(
      switchMap((student: Student) => {
        request.student.id = student.id;
        console.log(request.student.id);
        return this.http.post<any>(`${this.apiUrl}`, request, { headers });
      })
    );
  }

  getAllRequests():Observable<Request[]>{
    const headers = this.getToken();

    return this.http.get<Request[]>(`${this.apiUrl}`, { headers })
  }

  getRequestById(id: number): Observable<Request> {
    const headers = this.getToken();
    return this.http.get<Request>(`${this.apiUrl}/${id}`, { headers });
  }

}
