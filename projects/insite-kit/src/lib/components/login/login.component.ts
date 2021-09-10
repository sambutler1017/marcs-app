import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
  selector: 'ik-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  userLoggedIn = false;
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  public login() {
    const email = this.email.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.loading = true;

    this.auth.authenticate(email, password).subscribe(
      () => {
        this.userLoggedIn = true;
        this.router.navigate(['/home']);
        this.loading = false;
      },
      (error) => {
        console.log('Invalid Email or Password');
        this.loading = false;
      }
    );
  }
}
