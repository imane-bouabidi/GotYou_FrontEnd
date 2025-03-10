import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {RequestService} from '../../../../core/services/request/request.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-add-request-dialog',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogTitle,
    MatLabel
  ],
  templateUrl: './add-request-dialog.component.html',
  standalone: true,
  styleUrl: './add-request-dialog.component.scss'
})
export class AddRequestDialogComponent {

  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRequestDialogComponent>,
    private requestService: RequestService
  ) {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      reason: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const newRequest = this.requestForm.value;
      this.requestService.save(newRequest).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error('Error adding request:', err);
        }
      });
    }
  }
}
