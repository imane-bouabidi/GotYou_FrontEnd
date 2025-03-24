import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import {LoginGuard} from './guards/login/login.guard';
import {LogoutComponent} from './features/auth/logout/logout/logout.component';
import {StudentDashboardComponent} from './features/dashboard/student-dashboard/student-dashboard.component';
import {DonorDashboardComponent} from './features/donor/donor-dashboard/donor-dashboard.component';
import {RequestDetailsComponent} from './features/donor/request-details/request-details.component';
import {ProfileComponent} from './features/profile/profile.component';
import {DashboardComponent} from './features/admin/dashboard/dashboard.component';
import {UsersComponent} from './features/admin/users/users.component';
import {adminCheckGuard} from './guards/admin/admin-check.guard';
import {StudentRequestsComponent} from './features/admin/student-requests/student-requests.component';
import {CancelComponent} from './features/paiement/cancel/cancel.component';
import {SuccessComponent} from './features/paiement/success/success.component';
import {DonationAmountComponent} from './features/paiement/donation-amount/donation-amount.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate :[LoginGuard] },
  { path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'donor-dashboard', component: DonorDashboardComponent },
  { path: 'admin-dashboard', component: DashboardComponent,data: { hideNavbarFooter: true }, canActivate : [adminCheckGuard]},
  { path: 'admin/users', component: UsersComponent, data: { hideNavbarFooter: true }, canActivate : [adminCheckGuard] },
  {path: 'admin/student-requests', component: StudentRequestsComponent, canActivate: [adminCheckGuard]},
  { path: 'requests/:id', component: RequestDetailsComponent },
  { path: 'donation-amount/:requestId', component: DonationAmountComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
  { path: '**', redirectTo: '' }
];
