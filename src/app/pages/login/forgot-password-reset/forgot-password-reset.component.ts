import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.scss'],
})
export class ForgotPasswordResetComponent implements OnInit, OnDestroy {
  loading = false;
  form: FormGroup;
  token: string;
  destroy = new Subject<void>();

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();

    // this.route.params
    //   .pipe(
    //     map((p) => p.id),
    //     tap((token) => {
    //       const value = this.jwt.get('passwordReset', token);
    //       if (value === null || !value) {
    //         this.router.navigate(['/login']);
    //       }
    //     }),
    //     catchError(() => {
    //       this.router.navigate(['/login']);
    //       return of(null);
    //     }),
    //     takeUntil(this.destroy)
    //   )
    //   .subscribe((t) => (this.token = t));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onResetPassword() {
    this.loading = true;

    if (!this.validPassword()) {
      this.loading = false;
      return;
    }

    this.jwt.setToken(this.token);
    this.userService
      .resetUserPassword({ newPassword: this.form.value.newPassword })
      .subscribe({
        next: () => {
          this.popupService.success('Password has successfully been reset!');
          this.jwt.logOut();
        },
        error: () => {
          this.popupService.error(
            'Could not reset password at this time. Please try again later.'
          );
          this.jwt.logOut();
        },
      });
  }

  validPassword() {
    if (!this.passwordsMatch()) {
      this.popupService.error('Passwords do not match!');
      return false;
    }

    if (this.form.value.newPassword.toString().length < 8) {
      this.popupService.error(
        'Password needs to have a length of at least 8 characters.'
      );
      return false;
    }
    return true;
  }

  passwordsMatch(): boolean {
    return this.form.value.newPassword === this.form.value.confirmPassword;
  }
}
