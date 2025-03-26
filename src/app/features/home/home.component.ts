import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../../shared/nav/nav.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {StoryDto} from '../../core/models/dtos/StoryDto.model';
import {StoryService} from '../../core/services/stories/story.service';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage,
    DecimalPipe,
    NgIf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements  OnInit{
  stories!: StoryDto[];


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


  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    this.storyService.getAllStories().subscribe({
      next: (data) => {
        this.stories = data;
      },
      error: (err) => {
        console.error('Error fetching stories:', err);
      }
    });
  }


}
