import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../../shared/nav/nav.component';
import {RequestService} from '../../core/services/request/request.service';
import {Request} from '../../core/models/Request.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage,
    DecimalPipe,
    NgIf
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements  OnInit{
  requests! : Request[];



  features = [
    {
      icon: 'transparency',
      title: 'Transparent',
      description: 'Donations and distributions can be seen transparently'
    },
    {
      icon: 'fundraise',
      title: 'Quick Fundraise',
      description: 'Use online and co-fund way to make a donation'
    },
    {
      icon: 'realtime',
      title: 'Real Time',
      description: 'Reports in real-time connected with institutions that conduct relief'
    }
  ];

  stats = [
    {
      value: '10000+',
      label: 'Donations completed so far'
    },
    {
      value: '$120M+',
      label: 'Money raised for our causes'
    },
    {
      value: '1200+',
      label: 'Our volunteers around the world'
    },
    {
      value: '98%',
      label: 'Positive reviews from our donors'
    }
  ];


  constructor(private requestService : RequestService) {}

  ngOnInit() {
    this.LoadRequests();
  }


  LoadRequests(){
    this.requestService.getAllRequests().subscribe({
      next: (data)=>{
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching student:', err);
      }
    })
  }


}
