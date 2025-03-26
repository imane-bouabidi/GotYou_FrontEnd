import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {DecimalPipe} from '@angular/common';

interface AdminStatistics {
  totalRequests: number;
  approvedRequests: number;
  totalAmountRaised: number;
  totalUsers: number;
  pendingRequests: number;
}


@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule,
    SidebarComponent,
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  statistics: AdminStatistics = {
    totalRequests: 50,
    approvedRequests: 20,
    totalAmountRaised: 15000.50,
    totalUsers: 100,
    pendingRequests: 15
  };

  ngOnInit() {
    console.log('Statistiques statiques chargées:', this.statistics);
  }
}
