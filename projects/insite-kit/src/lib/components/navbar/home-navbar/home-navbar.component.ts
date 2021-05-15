import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../../service/jwt-service/jwt.service';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  name: string;

  constructor(private jwt: JwtService, private router: Router) {}

  ngOnInit() {
    this.name = this.jwt.get('firstName');
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }
}
