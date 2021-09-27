import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  loading = true;

  form: FormGroup;
  userId: number;
  destroy = new Subject();

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((p) => p.id),
        tap((id) => (this.userId = id)),
        takeUntil(this.destroy)
      )
      .subscribe((user) => this.buildForm());
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

  onResetClick() {
    const user: User = { password: this.form.value.password };
    this.userService.updateUserById(this.userId, user).subscribe(
      (res) => {
        this.toastService.success('User password successfully reset!');
        this.location.back();
      },
      () => {
        this.toastService.error('Could not reset user password at this time!');
        this.location.back();
      }
    );
  }
}
