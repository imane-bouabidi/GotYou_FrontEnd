import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { StudentGenderEnum } from '../../../core/models/enums/student-gender.enum';
import { StudentLevelEnum } from '../../../core/models/enums/student-level.enum';
import { DonorTypeEnum } from '../../../core/models/enums/donor-type.enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  studentForm: FormGroup;
  donorForm: FormGroup;
  activeTabIndex = 0;

  studentGenders = Object.values(StudentGenderEnum);
  studentLevels = Object.values(StudentLevelEnum);
  donorTypes = Object.values(DonorTypeEnum);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.studentForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      birthdate: [null, [Validators.required]],
      situationDetails: ['', [Validators.required, Validators.minLength(20)]],
      situationTitle: ['', [Validators.required]],
      startDate: [null],
      gender: [null, [Validators.required]],
      level: [null, [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.donorForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      birthdate: [null, [Validators.required]],
      speciality: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.minLength(20)]],
      donorType: [null, [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  tabChanged(event: any) {
    this.activeTabIndex = event.index;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword) {
      return password.value === confirmPassword.value
        ? null
        : { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    const currentForm = this.activeTabIndex === 0 ? this.studentForm : this.donorForm;
    const userType = this.activeTabIndex === 0 ? 'student' : 'donor';

    if (currentForm.valid) {
      const formData = { ...currentForm.value };
      delete formData.confirmPassword;

      formData.role = userType;
      formData.status = 'PENDING';

      if (formData.birthdate) {
        formData.birthdate = new Date(formData.birthdate).toISOString();
      }

      if (userType === 'student' && formData.startDate) {
        formData.startDate = new Date(formData.startDate).toISOString();
      }

      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erreur d\'inscription', error);
        },
      });
    }
  }
}
