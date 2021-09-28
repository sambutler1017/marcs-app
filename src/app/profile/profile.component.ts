import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/application/en.json';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  webRole = WebRole;
  applications: string[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getUserById(this.jwtService.get('userId'))
      .subscribe((v) => (this.user = v));
    this.generateApplicationString();
  }

  generateApplicationString() {
    const apps: string[] = this.jwtService.get('apps');
    const translations = Object.values(json)[0];
    apps.forEach((v) => this.applications.push(translations[v]));
  }

  onEditProfile() {
    this.router.navigate([
      `/user/details/${this.jwtService.get('userId')}/edit/info`,
    ]);
  }

  onSaveClick() {}
}
