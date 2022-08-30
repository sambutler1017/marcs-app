import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
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
    private readonly toastService: ToastrService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();

    this.route.params
      .pipe(
        map((p) => p.id),
        tap((token) => {
          const value = this.jwt.get('passwordReset', token);
          if (value === null || !value) {
            this.router.navigate(['/login/overview']);
          }
        }),
        catchError(() => {
          this.router.navigate(['/login/overview']);
          return of(null);
        }),
        takeUntil(this.destroy)
      )
      .subscribe((t) => (this.token = t));
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
      .subscribe(
        () => {
          this.toastService.success('Password has successfully been reset!');
          this.jwt.logOut();
        },
        () => {
          this.toastService.error(
            'Could not reset password at this time. Please try again later.'
          );
          this.jwt.logOut();
        }
      );
  }

  validPassword() {
    if (!this.passwordsMatch()) {
      this.toastService.error('Passwords do not match!');
      return false;
    }

    if (this.form.value.newPassword.toString().length < 8) {
      this.toastService.error(
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
