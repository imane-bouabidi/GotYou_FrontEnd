import { Component } from '@angular/core';
import {NavComponent} from '../../shared/nav/nav.component';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
