import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  standalone: true,
  styleUrl: './success.component.scss'
})
export class SuccessComponent  implements OnInit{
  message!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    const donationId = this.route.snapshot.queryParamMap.get('donation_id');
    this.http.get(`http://localhost:8080/gotYou/api/donations/success?session_id=${sessionId}&donation_id=${donationId}`, { responseType: 'text' })
      .subscribe({
        next: (response) => this.message = response,
        error: (err) => this.message = 'Erreur : ' + err.message
      });
  }
}
