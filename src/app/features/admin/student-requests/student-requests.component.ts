import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Request} from '../../../core/models/Request.model';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {DatePipe, NgClass, NgFor, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {RequestService} from '../../../core/services/request/request.service';
import {RequestStatus} from '../../../core/models/enums/request-status.enum';

@Component({
  selector: 'app-student-requests',
  imports: [SidebarComponent, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './student-requests.component.html',
  standalone: true,
  styleUrls: ['./student-requests.component.scss']
})
export class StudentRequestsComponent implements OnInit {
  requests!: Request[];
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private requestService : RequestService) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.isLoading = true;
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.isLoading = false;
        console.log(data)
        console.log(typeof  data[0].status)
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des requêtes:', err);
        if (err.status === 401) {
          alert('Session expirée ou non autorisée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        }
        this.isLoading = false;
      }
    });
  }

  approveRequest(requestId: number) {
    this.requestService.updateStudentRequestStatus(requestId, RequestStatus.DONE).subscribe({
      next: (updatedRequest) => {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
          request.status = RequestStatus.DONE;
        }
      },
      error: (err) => {
        console.error('Erreur lors de l’approbation de la requête:', err);
        if (err.status === 401) {
          alert('Non autorisé. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  rejectRequest(requestId: number) {
    this.requestService.updateStudentRequestStatus(requestId, RequestStatus.REFUSED).subscribe({
      next: (updatedRequest) => {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
          request.status = RequestStatus.REFUSED;
        }
      },
      error: (err) => {
        console.error('Erreur lors du rejet de la requête:', err);
        if (err.status === 401) {
          alert('Non autorisé. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  protected readonly RequestStatus = RequestStatus;
}
