import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './features/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, NavComponent, FooterComponent, NgIf, SidebarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gotYou-frontend';

  showNavbar = true;
  showNavbarFooter = true;
  isAdminDashboard = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminDashboard = event.urlAfterRedirects.startsWith('/admin');
        this.showNavbar = !this.isAdminDashboard;
        this.showNavbarFooter = !this.isAdminDashboard;
      });
  }
}
