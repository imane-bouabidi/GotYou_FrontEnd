import {Component, inject, OnInit} from '@angular/core';
import {Request} from '../../../core/models/Request.model';
import {StudentService} from '../../../core/services/student/student.service';
import { MatDialog } from '@angular/material/dialog';

import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AddRequestDialogComponent} from '../dialog/add-request-dialog/add-request-dialog.component';
import {MatSnackBarContainer} from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    MatTable,
    MatIcon,
    MatToolbar,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatIconButton,
    MatCell,
    MatHeaderCell,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatButton,
    MatSnackBarContainer
  ],
  templateUrl: './student-dashboard.component.html',
  standalone: true,
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements OnInit{

  requests!: Request[];
  StudentService= inject(StudentService);
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];


  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    console.log("here");
    this.studentService.getStudentRequests().subscribe({
      next: (data) => {
        this.requests = data;
        console.log("data : " + data);
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      },
    });
        console.log("requests : " + this.requests);
  }

  openAddRequestDialog(): void {
    const dialogRef = this.dialog.open(AddRequestDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRequests();
      }
    });
  }

  editRequest(request: Request): void {
    // Implement edit logic here
    console.log('Edit request:', request);
  }

  deleteRequest(request: Request): void {
    // Implement delete logic here
    console.log('Delete request:', request);
  }
}
