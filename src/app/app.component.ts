import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavComponent} from './shared/nav/nav.component';
import {FooterComponent} from './shared/footer/footer.component';
import {filter} from 'rxjs';
import {NgIf} from '@angular/common';
import {SidebarComponent} from './features/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, NavComponent, FooterComponent, NgIf, SidebarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'gotYou-frontend';

  showNavbar = true;
  showNavbarFooter = true;
  isDonorDashboard = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('URL:', event.urlAfterRedirects);
        this.isDonorDashboard = event.urlAfterRedirects.includes('/admin-dashboard');
        this.showNavbar = !this.isDonorDashboard;
        this.showNavbarFooter = !this.isDonorDashboard;
      });
  }
}
