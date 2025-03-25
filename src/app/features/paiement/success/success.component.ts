import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/services/auth/auth.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-success',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './success.component.html',
  standalone: true,
  styleUrl: './success.component.scss'
})
export class SuccessComponent  implements OnInit{
  message!: string;
  donations: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,private authService: AuthService) {}

  // ngOnInit(): void {
  //   const sessionId = this.route.snapshot.queryParamMap.get('session_id');
  //   if (sessionId) {
  //     const headers = new HttpHeaders({
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     });
  //     this.http.get(`http://localhost:8080/gotYou/api/donations/success?session_id=${sessionId}`, { headers })
  //       .subscribe({
  //         next: (response) => console.log('Réponse du backend :', response),
  //         error: (err) => console.error('Erreur lors de l’appel à /success :', err)
  //       });
  //   }
  // }

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      this.handlePaymentSuccess(sessionId);
    }
    this.loadDonationHistory();
  }

  handlePaymentSuccess(sessionId: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    this.http.get(`http://localhost:8080/gotYou/api/donations/success?session_id=${sessionId}`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Donation enregistrée :', response);
        },
        error: (err) => console.error('Erreur lors de l’appel à /success :', err)
      });
  }

  loadDonationHistory(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    this.http.get<any[]>('http://localhost:8080/gotYou/api/donations/donor-donations', { headers })
      .subscribe({
        next: (donations) => {
          this.donations = donations;
          console.log('Historique des dons :', donations);
        },
        error: (err) => console.error('Erreur lors de la récupération de l’historique :', err)
      });
  }
}
