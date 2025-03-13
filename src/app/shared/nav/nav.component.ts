import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../core/services/auth/auth.service';
import {User} from '../../core/models/User.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav.component.html',
  standalone: true,
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  userName: string = '';
  user!: User;
  constructor(private authService: AuthService ) {}

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.getUserInfo();
    }
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserInfo(): void {
    this.authService.getUserInfos().subscribe({
      next: (user) => {
        this.userName = user.name || user.userName;
        this.user = user;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    });
  }
}
