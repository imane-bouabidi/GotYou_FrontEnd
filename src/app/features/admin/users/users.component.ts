import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models/User.model';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [SidebarComponent, NgFor, NgIf, NgClass, FormsModule], // Ajout de FormsModule pour ngModel
  templateUrl: './users.component.html',
  standalone: true,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        if (err.status === 401) {
          alert('Session expirée ou non autorisée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        }
        this.isLoading = false;
      }
    });
  }

  updateUserRole(user: User) {
    this.authService.updateUserRole(user.id, user.role).subscribe({
      next: (updatedUser) => {
        console.log('Rôle mis à jour:', updatedUser);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du rôle:', err);
        if (err.status === 401) {
          alert('Non autorisé. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  updateUserStatus(user: User) {
    this.authService.updateUserStatus(user.id, user.status).subscribe({
      next: (updatedUser) => {
        console.log('Statut mis à jour:', updatedUser);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut:', err);
        if (err.status === 401) {
          alert('Non autorisé. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  editUser(user: User) {
    // Rediriger vers une page d'édition avec l'ID de l'utilisateur
    this.router.navigate(['/admin/users/edit', user.id]);
  }

  banUser(user: User) {
    if (confirm(`Voulez-vous vraiment bannir ${user.name} ${user.lastName} ?`)) {
      this.authService.banUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error: (err) => {
          console.error('Erreur lors du bannissement:', err);
          if (err.status === 401) {
            alert('Non autorisé. Veuillez vous reconnecter.');
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }
}
