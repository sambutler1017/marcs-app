import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ik-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent {
  @Input() appName: string;
  constructor(private router: Router) {}

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onWaffleClick() {
    this.router.navigate(['home']);
  }

  onBellClick() {
    this.router.navigate(['/notification']);
  }
}
