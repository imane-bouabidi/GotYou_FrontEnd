import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Request} from '../../../../core/models/Request.model';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
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
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRequestDialogComponent>,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: Request | null
  ) {
    this.isEditMode = !!data;
    this.requestForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      reason: [data?.reason || '', Validators.required],
      amount: [data?.amount || 0, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const requestData = this.requestForm.value;

      if (this.isEditMode && this.data) {
        // Edit mode: Update the existing request
        const updatedRequest = { ...this.data, ...requestData };
        this.requestService.update(updatedRequest).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error updating request:', err);
          }
        });
      } else {
        // Add mode: Create a new request
        // this.requestService.save(requestData).subscribe({
        //   next: () => {
        //     this.dialogRef.close(true);
        //   },
        //   error: (err) => {
        //     console.error('Error adding request:', err);
        //   }
        // });

          this.requestService.save(requestData).subscribe({
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
}
