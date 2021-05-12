import { Component, OnInit } from '@angular/core';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt-service.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.userService
      .getUserById(this.jwtService.get('userId'))
      .subscribe((v: User) => {
        this.user = v[0];
        console.log(v);
      });
  }
}
