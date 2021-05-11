import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
  selector: 'ik-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  userLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {}

  public login() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    this.auth.authenticate(username, password).subscribe(
      () => {
        this.userLoggedIn = true;
        this.router.navigate(['/home']);
      },
      (error) => console.log('Invalid Username or Password')
    );
  }
}
