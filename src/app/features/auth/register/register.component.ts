import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      cin: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,10}$/)]],
      birthDate: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
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
    if (this.registerForm.valid) {
      const rawBirthDate = this.registerForm.get('birthDate')?.value;
      const birthDate = new Date(rawBirthDate).toISOString();
      this.authService.register({
        ...this.registerForm.value,birthDate: birthDate }).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Erreur d\'inscription', error);
        },
      });
    }
  }
}
