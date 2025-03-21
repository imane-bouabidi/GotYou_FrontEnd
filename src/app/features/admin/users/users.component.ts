import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { User } from '../../../core/models/User.model';
import { AuthService } from '../../../core/services/auth/auth.service'; // À ajuster si vous avez un service spécifique
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SidebarComponent, FormsModule, NgFor, NgClass],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = []; // Liste des utilisateurs

  constructor(private authService: AuthService) {} // Remplacez par votre service utilisateur si différent

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // Simule une récupération des utilisateurs - À remplacer par une vraie API
    // Exemple : this.userService.getAllUsers().subscribe(...)
    this.users = [
      { id: 1, userName: 'john_doe', name: 'John', lastName: 'Doe', email: 'john@example.com', role: 'STUDENT', status: 'APPROVED', cin: '', password: '', birthDate: new Date(), profileImage: '' },
      { id: 2, userName: 'jane_smith', name: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'DONOR', status: 'PENDING', cin: '', password: '', birthDate: new Date(), profileImage: '' },
      { id: 3, userName: 'bob_jones', name: 'Bob', lastName: 'Jones', email: 'bob@example.com', role: 'STUDENT', status: 'REJECTED', cin: '', password: '', birthDate: new Date(), profileImage: '' }
    ];
  }

  updateUserStatus(user: User) {
    // Logique pour mettre à jour le statut via une API
    console.log(`Mise à jour du statut de ${user.userName} à ${user.status}`);
    // Exemple : this.userService.updateUser(user).subscribe(...)
  }

  editUser(user: User) {
    // Logique pour modifier l'utilisateur (ex : ouvrir un modal ou rediriger)
    console.log(`Modifier l'utilisateur ${user.userName}`);
    // Exemple : this.router.navigate(['/admin/users/edit', user.id]);
  }

  banUser(user: User) {
    // Logique pour bannir l'utilisateur
    console.log(`Bannir l'utilisateur ${user.userName}`);
    if (confirm(`Voulez-vous vraiment bannir ${user.userName} ?`)) {
      user.status = 'REJECTED'; // Ou appelez une API pour bannir
      this.updateUserStatus(user);
    }
  }
}
