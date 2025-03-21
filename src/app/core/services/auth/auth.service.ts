import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { Student } from '../../models/Student.model';
import {UserDto} from '../../models/dtos/UserDto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/gotYou/api";
  private userApiUrl = 'http://localhost:8080/gotYou/api/users';

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
      this.loadCurrentUser();
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
          this.redirectUser();
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

  getUserInfos(): Observable<User> {

    const cachedUser = this.currentUser.getValue();
    if (cachedUser) {
      return new Observable(observer => {
        observer.next(cachedUser);
        observer.complete();
      });
    }

    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.userApiUrl}/current`, { headers });
  }

  private loadCurrentUser(): void {
    if (this.isAuthenticated()) {
      this.getUserInfos().subscribe();
    }
  }

  updateUserCache(user: User): void {
    this.currentUser.next(user);
  }
  redirectUser(): void {
    this.getUserInfos().subscribe({
      next: (user) => {
        if (user.role === "STUDENT") {
          this.router.navigate(['/dashboard']);
        } else if (user.role === "DONOR") {
          this.router.navigate(['/donor-dashboard']);
        }else
          this.router.navigate(['/admin-dashboard'])
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des infos utilisateur:", err);
      }
    });
  }

  uploadProfileImage(formData: FormData): Observable<{ profileImage: string }> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ profileImage: string }>(`${this.userApiUrl}/upload-profile-image`, formData, { headers });
  }

  updateUser(userId: number, dto : UserDto): Observable<User> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<User>(`${this.userApiUrl}/${userId}`, dto, { headers });
  }

  getAllUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>(this.userApiUrl, { headers });
  }

  updateUserStatus(userId: number, status: string): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<User>(`${this.apiUrl}/admin/users/status/${userId}`, status, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.userApiUrl}/${userId}`, { headers });
  }
  banUser(userId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.userApiUrl}/${userId}/ban`, { headers });
  }

  updateUserRole(userId: number, role: string): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<User>(`${this.apiUrl}/admin/users/${userId}/role`, role, { headers });
  }
}
