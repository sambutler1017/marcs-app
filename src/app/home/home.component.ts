import { Component, OnInit } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/home/en.json';
import { App } from 'projects/insite-kit/src/lib/models/app.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt-service.service';
import { User } from '../../../projects/insite-kit/src/lib/models/user.model';

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
    this.name = this.jwt.get('first_name');
    this.buildApps();
  }

  logout() {
    this.jwt.logOut();
  }

  buildApps() {
    const data = Object.values(json.appIcons);
    data.forEach((app: App) => this.apps.push(app));
  }
}
