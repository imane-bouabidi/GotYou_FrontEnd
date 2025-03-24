import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cancel',
  imports: [],
  templateUrl: './cancel.component.html',
  standalone: true,
  styleUrl: './cancel.component.scss'
})
export class CancelComponent implements OnInit{
  message!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const donationId = this.route.snapshot.queryParamMap.get('donation_id');
    this.http.get(`http://localhost:8080/gotYou/api/donations/cancel?donation_id=${donationId}`, { responseType: 'text' })
      .subscribe({
        next: (response) => this.message = response,
        error: (err) => this.message = 'Erreur : ' + err.message
      });
  }
}
