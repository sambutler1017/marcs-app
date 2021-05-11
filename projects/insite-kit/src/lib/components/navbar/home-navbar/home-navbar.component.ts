import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../service/jwt-service/jwt-service.service';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  name: string;

  constructor(private jwt: JwtService) {}

  ngOnInit() {
    this.name = this.jwt.get('first_name');
  }

  logout() {
    this.jwt.logOut();
  }
}
