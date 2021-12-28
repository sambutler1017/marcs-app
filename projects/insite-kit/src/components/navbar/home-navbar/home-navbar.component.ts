import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Access, App, Feature } from '../../../models/common.model';
import { JwtService } from '../../../service/jwt-service/jwt.service';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  @Input() titleName = "Marc's";
  name: string;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private jwt: JwtService,
    private router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.name = this.jwt.get('firstName');
    this.notificationService
      .getNotifications(new Map().set('receiverId', this.jwt.get('userId')))
      .subscribe((res) => {
        console.log(res);
      });
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onBellClick() {
    this.router.navigate(['/notification']);
  }
}
