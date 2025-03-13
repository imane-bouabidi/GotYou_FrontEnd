import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Student} from '../../../core/models/Student.model';
import {Request} from '../../../core/models/Request.model';
import {RequestService} from '../../../core/services/request/request.service';
import {StudentService} from '../../../core/services/student/student.service';
import {NgClass} from '@angular/common';
import {RequestStatus} from '../../../core/models/enums/request-status.enum';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  student!: Student;
  request! : Request;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private studentService: StudentService
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

  protected readonly RequestStatus = RequestStatus;
}
