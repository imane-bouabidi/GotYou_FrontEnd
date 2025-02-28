import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  standalone: true,
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
  }
}
