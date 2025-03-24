import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RequestService} from '../../../core/services/request/request.service';

declare const Stripe: any;

@Component({
  selector: 'app-donation-amount',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-amount.component.html',
  styleUrls: ['./donation-amount.component.css']
})
export class DonationAmountComponent implements OnInit {
  requestId: number;
  requestAmount: number;
  donationAmount: number;
  stripe = Stripe('pk_test_51R697o4RRHFJGYKcL3XkPjrym8HUwy1mnYbLqVzelPL4voY7XKXA68Cq6W1royCBFg0mRCgUOBxBGVUh2GYmOKZ800SDsaYRzZ');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {
    this.requestId = 0;
    this.requestAmount = 0;
    this.donationAmount = 0;
  }

  ngOnInit(): void {
    this.requestId = +this.route.snapshot.paramMap.get('requestId')!;
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
      alert('Veuillez entrer un montant valide.');
      return;
    }

    this.requestService.createCheckoutSession(this.requestId, this.donationAmount).subscribe({
      next: (sessionId: string) => {
        this.stripe.redirectToCheckout({ sessionId });
      },
      error: (err) => {
        console.error('Erreur lors de la création de la session Stripe', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/requests', this.requestId]);
  }
}
