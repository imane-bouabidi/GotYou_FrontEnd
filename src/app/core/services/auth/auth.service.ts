import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/gotYou/api";
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }): Observable<any> {

    const params = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);

    return this.http.post(`${this.apiUrl}/auth/login`, {},{
      params,
      responseType: 'text'
    }).pipe(
      tap({
        next: (response: any) => {
          this.setToken(response.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur de connexion', error);
        }
      })
    );
  }

  register(userData: {
    username: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    cin: string,
    birthDate: Date
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    // const token = this.getToken();
    // if (token) {
    //   this.http.post(`${this.apiUrl}/auth/logout`, {}, {
    //     headers: { 'Authorization': token }
    //   }).subscribe({
    //     next: () => {
    //       console.log('Token invalidé avec succès');
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors de l\'invalidation du token', error);
    //     },
    //     complete: () => {
    //       localStorage.removeItem('token');
    //       this.tokenSubject.next(null);
    //       this.router.navigate(['/login']);
    //     }
    //   });
    // } else {
      localStorage.removeItem('token');
      this.tokenSubject.next(null);
      this.router.navigate(['/login']);
    // }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
