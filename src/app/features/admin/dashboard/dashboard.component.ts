import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

   products: any[] | undefined;
}
