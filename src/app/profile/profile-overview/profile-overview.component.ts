import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
})
export class ProfileOverviewComponent implements OnInit {
  user: User;
  webRole = WebRole;
  applications: string[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly commonService: CommonService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit() {
    this.userService
      .getUserById(this.jwtService.get('userId'))
      .subscribe((v) => (this.user = v));
    this.generateApplicationString();
  }

  generateApplicationString() {
    this.applications = this.commonService.getApplicationList(
      this.jwtService.get('apps')
    );
  }

  onEditProfile() {
    this.router.navigate(['/profile/edit']);
  }

  onResetPassword() {
    this.router.navigate(['/profile/update-password']);
  }

  onBackClick() {
    this.location.back();
  }
}
