import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';

@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss'],
})
export class LoginOverviewComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', Validators.required],
    });
  }

  public login() {
    this.loading = true;

    this.auth
      .authenticate(this.formGroup.value.email, this.formGroup.value.password)
      .subscribe({
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
