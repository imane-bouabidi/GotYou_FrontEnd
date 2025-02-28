import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import {LoginGuard} from './guards/login/login.guard';
import {LogoutComponent} from './features/auth/logout/logout/logout.component';
import {StudentDashboardComponent} from './features/dashboard/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate :[LoginGuard] },
  { path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: '**', redirectTo: '' }
];
