import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';

@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss'],
})
export class LoginOverviewComponent {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  loading = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  public login() {
    const email = this.email.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.loading = true;

    this.auth.authenticate(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: () => {
        this.popupService.error('Invalid email or password!');
        this.loading = false;
      },
    });
  }
}
