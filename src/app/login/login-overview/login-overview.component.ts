import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';

@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss'],
})
export class LoginOverviewComponent {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  userLoggedIn = false;
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly toastService: ToastrService
  ) {}

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
        this.toastService.error('Invalid email or password!');
        this.loading = false;
      }
    );
  }
}
