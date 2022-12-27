import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  loading = true;

  form: FormGroup;
  userId: number;
  destroy = new Subject<void>();

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params
      .pipe(
        map((p) => p.id),
        tap((id) => (this.userId = id)),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.buildForm());
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.loading = false;
  }

  onCancelClick() {
    this.location.back();
  }

  onBackClick() {
    this.location.back();
  }

  onResetClick() {
    this.loading = true;

    if (!this.validPassword()) {
      this.loading = false;
      return;
    }

    const passUpdate = { newPassword: this.form.value.password };
    this.userService.updateUserPasswordById(this.userId, passUpdate).subscribe({
      next: () => {
        this.popupService.success('User password successfully reset!');
        this.location.back();
      },
      error: () => {
        this.popupService.error('Could not reset user password at this time!');
        this.location.back();
      },
    });
  }

  validPassword() {
    if (!this.passwordsMatch()) {
      this.popupService.error('Passwords do not match!');
      return false;
    }

    if (this.form.value.password.toString().length < 8) {
      this.popupService.error(
        'Password needs to have a length of at least 8 characters.'
      );
      return false;
    }
    return true;
  }

  passwordsMatch(): boolean {
    return this.form.value.password === this.form.value.confirmPassword;
  }
}
