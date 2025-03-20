import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/User.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import {MessageService} from 'primeng/api';
import {UserDto} from '../../core/models/dtos/UserDto.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    userName: '',
    name: '',
    lastName: '',
    email: '',
    cin: '',
    password: '',
    birthDate: new Date(),
    role: '',
    status: '',
    profileImage: ''
  };

  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isEditing = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUser();
    this.checkUserRole();
  }

  getUser() {
    this.isLoading = true;
    this.authService.getUserInfos().subscribe({
      next: (data) => {
        this.user = data;
        if (this.user.profileImage) {
          this.previewImage = 'http://localhost:8080/gotYou' + this.user.profileImage;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);

      this.uploadImage();
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.user.id.toString());

      this.authService.uploadProfileImage(formData).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          this.user.profileImage = response.profileImage;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Image de profil mise à jour'
          });
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Échec de la mise à jour de l\'image'
          });
        }
      });
    }
  }
  isAdmin = false;
  checkUserRole(): void {
    // Vérifie si l'utilisateur actuel est un administrateur
    // À remplacer par votre propre logique
    this.isAdmin = true; // Pour tester
  }
  saveChanges() {
    this.isLoading = true;

    const updateData: UserDto = {
      // userName: this.user.userName,
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      cin: this.user.cin,
      birthDate: this.user.birthDate.toString()
    };

    setTimeout(() => {

    this.authService.updateUser(this.user.id, updateData).subscribe({
      next: (updatedUser) => {
        this.user = { ...updatedUser, profileImage: this.user.profileImage };

        // Mettre à jour le cache utilisateur
        this.authService.updateUserCache(this.user);

        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Profil mis à jour avec succès'
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la mise à jour du profil'
        });
        this.isLoading = false;
      }
    });


    this.isLoading = false;
    this.showSuccessMessage();
  }, 1000);
}

showSuccessMessage(): void {
  this.snackBar.open('Profil mis à jour avec succès', 'Fermer', {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['success-snackbar']
  });
}

showErrorMessage(error: any): void {
  this.snackBar.open('Erreur lors de la mise à jour du profil', 'Fermer', {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['error-snackbar']
  });
}

}
