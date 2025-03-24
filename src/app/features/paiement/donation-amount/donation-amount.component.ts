import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../core/services/request/request.service';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { provideNgxStripe } from 'ngx-stripe';

@Component({
  selector: 'app-donation-amount',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './donation-amount.component.html',
  styleUrls: ['./donation-amount.component.css']
})
export class DonationAmountComponent implements OnInit {
  requestId: number;
  requestAmount: number;
  donationAmount: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private stripe: StripeService,
    private router: Router
  ) {
    this.requestId = 0;
    this.requestAmount = 0;
    this.donationAmount = 0;
  }

  ngOnInit(): void {
    const requestIdParam = this.route.snapshot.paramMap.get('requestId');
    this.requestId = requestIdParam ? +requestIdParam : 0;

    this.requestService.getRequestById(this.requestId).subscribe({
      next: (request) => {
        this.requestAmount = request.amount;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la demande', err);
      }
    });
  }

  submitDonation(): void {
    if (this.donationAmount <= 0) {
      this.errorMessage = 'Veuillez entrer un montant valide.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.requestService.createDonationAndCheckout(this.requestId, this.donationAmount).subscribe({
      next: (sessionId: string) => {
        console.log('Session ID reçu :', sessionId);
        this.stripe.redirectToCheckout({ sessionId }).subscribe({
          next: (result) => {
            if (result.error) {
              this.errorMessage = 'Erreur lors de la redirection : ' + result.error.message;
            }
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors de la redirection : ' + err.message;
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la création de la donation : ' + err.message;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/requests', this.requestId]);
  }
}
