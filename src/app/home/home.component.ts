import { Component, OnInit } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/home/en.json';
import { App } from 'projects/insite-kit/src/models/app.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { User } from '../../../projects/insite-kit/src/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User;
  hasData = false;
  apps: App[] = new Array();
  name: string;

  constructor(private jwt: JwtService) {}

  ngOnInit() {
    this.name = this.jwt.get('firstName');
    this.buildApps();
  }

  logout() {
    this.jwt.logOut();
  }

  buildApps() {
    const data = Object.values(json)[0];
    this.jwt.get('apps').forEach((v: string) => this.apps.push(data[v]));
  }
}
