import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Request} from '../../../../core/models/Request.model';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,

} from '@angular/material/dialog';
import {RequestService} from '../../../../core/services/request/request.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-edit-request-dialog',
  templateUrl: './edit-request-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  styleUrls: ['./edit-request-dialog.component.scss']
})
export class EditRequestDialogComponent {

  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRequestDialogComponent>,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: Request
  ) {
    this.requestForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      reason: [data.reason, Validators.required],
      amount: [data.amount, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const updatedRequest = { ...this.data, ...this.requestForm.value };
      this.requestService.update(updatedRequest).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating request:', err);
        }
      });
    }
  }
}
