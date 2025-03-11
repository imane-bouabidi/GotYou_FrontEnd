import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RequestService} from '../../../core/services/request/request.service';
import {Request} from '../../../core/models/Request.model';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-donor-dashboard',
  imports: [
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './donor-dashboard.component.html',
  standalone: true,
  styleUrl: './donor-dashboard.component.scss'
})
export class DonorDashboardComponent implements OnInit{

  requests!: Request[];
  constructor(private requestService: RequestService) {}
  ngOnInit() {
    this.LoadRequests();
  }

  LoadRequests(){
    this.requestService.getAllRequests().subscribe({
      next: (data)=>{
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      },
    })
  }


}
