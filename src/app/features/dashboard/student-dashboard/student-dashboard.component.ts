import {Component, inject, OnInit} from '@angular/core';
import {Request} from '../../../core/models/Request.model';
import {StudentService} from '../../../core/services/student/student.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [],
  templateUrl: './student-dashboard.component.html',
  standalone: true,
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements OnInit{

  requests!: Request[];
  StudentService= inject(StudentService);

  ngOnInit(): void {
    this.loadRequsts();
  }

  loadRequsts(){
    this.StudentService.getStudentRequests().subscribe({
      next: (data) => {
        this.requests = data;
        console.log(this.requests);
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      },
    });
  }

}
