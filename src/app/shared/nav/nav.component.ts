import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../core/services/auth/auth.service';

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
export class NavComponent {

  constructor(private authService: AuthService ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
}
}
