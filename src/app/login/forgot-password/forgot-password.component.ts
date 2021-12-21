import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSendEmail() {
    this.loading = true;
    this.userService
      .doesEmailExist(this.form.value.email)
      .pipe(
        filter((status) => {
          if (!status) {
            this.toastService.error(
              'The given email does not exist in our records. Please check that you typed in the email right.'
            );
            this.loading = false;
          }
          return status;
        }),
        switchMap(() => this.userService.forgotPassword(this.form.value.email))
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.toastService.success(
            'Email has sucessfully been sent! Please follow the instructions to reset your password.'
          );
          this.router.navigate(['/login/overview']);
        },
        () => {
          this.loading = false;
          this.toastService.error(
            'Could not send email! Please try again later.'
          );
          this.router.navigate(['login/overview']);
        }
      );
  }
}
