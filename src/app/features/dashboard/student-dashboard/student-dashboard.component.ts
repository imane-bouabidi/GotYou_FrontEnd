// src/app/features/dashboard/student-dashboard/student-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Request } from '../../../core/models/Request.model';
import { StudentService } from '../../../core/services/student/student.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from '../../../core/services/request/request.service';
import { AddRequestDialogComponent } from '../dialog/add-request-dialog/add-request-dialog.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatTable,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    NgClass
  ],
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  requests!: Request[];
  displayedColumns: string[] = ['id', 'title', 'description', 'amount', 'status', 'actions'];

  constructor(
    private studentService: StudentService,
    private requestService: RequestService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.studentService.getStudentRequests().subscribe({
      next: (data) => {
        console.log(typeof data[0].status)
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      },
    });
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'WAITING':
        return 'schedule';
      case 'PENDING':
        return 'hourglass_empty';
      case 'DONE':
        return 'check_circle';
      case 'REFUSED':
        return 'cancel';
      default:
        return 'help';
    }
  }

  openAddRequestDialog(): void {
    const dialogRef = this.dialog.open(AddRequestDialogComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRequests();
      }
    });
  }

  editRequest(request: Request): void {
    const dialogRef = this.dialog.open(AddRequestDialogComponent, {
      width: '500px',
      data: request
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRequests();
      }
    });
  }

  deleteRequest(request: Request): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.delete(request.id).subscribe({
        next: () => {
          this.snackBar.open('Request deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadRequests();
        },
        error: (err) => {
          console.error('Error deleting request:', err);
          this.snackBar.open('Error deleting request', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
