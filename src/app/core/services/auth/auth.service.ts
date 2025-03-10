import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { Student } from '../../models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/gotYou/api";
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';

  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const params = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);

    return this.http.post(`${this.apiUrl}/auth/login`, {}, {
      params,
      responseType: 'text'
    }).pipe(
      tap({
        next: (response: string) => {
          console.log('Login response:', response);
          this.setToken(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Erreur de connexion', error);
        }
      })
    );
  }

  register(userData: User, userType: any): Observable<any> {
    if (userType === 'student') {
      return this.http.post(`${this.apiUrl}/auth/register/student`, userData);
    } else {
      return this.http.post(`${this.apiUrl}/auth/register`, userData);
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token.replace('Bearer ', '') : '';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfos(): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student>(`${this.userApiUrl}/current`, { headers });
  }
}
