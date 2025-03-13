import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomeComponent} from './features/home/home.component';
import {NavComponent} from './shared/nav/nav.component';
import {FooterComponent} from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gotYou-frontend';
}
