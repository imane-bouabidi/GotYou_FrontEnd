import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RequestService} from '../../../core/services/request/request.service';
import {Request} from '../../../core/models/Request.model';
import {MatIcon} from '@angular/material/icon';
import {StudentService} from '../../../core/services/student/student.service';
import {Student} from '../../../core/models/Student.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-donor-dashboard',
  imports: [
    NgOptimizedImage,
    MatIcon,
    RouterLink
  ],
  templateUrl: './donor-dashboard.component.html',
  standalone: true,
  styleUrl: './donor-dashboard.component.scss'
})
export class DonorDashboardComponent implements OnInit{

  requests!: Request[];
  student! : Student;
  constructor(private requestService: RequestService, private studentService: StudentService ) {}
  ngOnInit() {
    this.LoadRequests();
  }

  LoadRequests() {
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        console.log(this.requests)
        this.loadStudents();
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      },
    });
  }

  loadStudents() {
    this.requests.forEach(request => {
      if (request.student) {
        this.studentService.getStudentById(request.student.id).subscribe({
          next: (student) => {
            this.student = student;
          },
          error: (err) => {
            console.error('Error fetching student:', err);
          }
        });
      }
    });
  }


}
