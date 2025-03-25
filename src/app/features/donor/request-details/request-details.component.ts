import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Student} from '../../../core/models/Student.model';
import {Request} from '../../../core/models/Request.model';
import {RequestService} from '../../../core/services/request/request.service';
import {StudentService} from '../../../core/services/student/student.service';
import {NgClass, NgIf} from '@angular/common';
import {Stripe} from '@stripe/stripe-js';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  student!: Student;
  request! : Request;
  stripe: Stripe | null = null;
  totalDonations: number = 0;
  donationProgress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.loadRequestDetails( parseInt(requestId));
    }
  }

  loadRequestDetails(requestId: number): void {
    this.requestService.getRequestById(requestId).subscribe({
      next: (data) => {
        this.request = data;
        this.loadStudentDetails(data.id);
      },
      error: (err) => {
        console.error('Error fetching request:', err);
      }
    });
  }

  loadStudentDetails(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error('Error fetching student:', err);
      }
    });
  }

  supportRequest(): void {
    if (!this.request) return;
    this.router.navigate(['/donation-amount', this.request.id]);
  }
}
