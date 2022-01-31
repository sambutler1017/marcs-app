import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  loading = false;
  stores: Store[];
  storesLoading = true;
  form: FormGroup;
  roles: string[];
  validStoreUsers: any = [
    WebRole[WebRole.CUSTOMER_SERVICE_MANAGER],
    WebRole[WebRole.ASSISTANT_MANAGER],
    WebRole[WebRole.MANAGER],
    WebRole[WebRole.EMPLOYEE],
  ];

  WebRole = WebRole;

  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = false;
    this.storesLoading = true;
    this.buildForm();
    this.setAllowedRoles();

    this.storeService.getStores().subscribe(
      (res) => {
        this.stores = res;
        this.storesLoading = false;
      },
      () => {
        this.toastService.error(
          'Can not create account at this time. Try again later.'
        );
        this.router.navigate(['/overview']);
      }
    );
  }

  onCreateAccount() {
    if (this.form.value.password.toString().trim().length < 8) {
      this.toastService.error('Password must be at least 8 characters long.');
      return;
    }

    this.loading = true;

    let user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      webRole: this.form.value.positionTitle,
      password: this.form.value.password,
    };

    if (this.form.value.storeId) {
      user.storeId = this.form.value.storeId.toUpperCase();
    }

    this.userService.createUser(user).subscribe(
      (res) => {
        this.loading = false;
        this.toastService.success(
          'Account created Successfully! Once your account is approved, you will then be able to login with the email and password you provided'
        );
        this.router.navigate(['/overview']);
      },
      (err) => {
        this.loading = false;
        this.toastService.error(
          'Account could not be created at this time. Please try again later.'
        );
        this.router.navigate(['/overview']);
      }
    );
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      positionTitle: ['', Validators.required],
      password: ['', Validators.required],
      storeId: '',
      storeName: '',
    });

    this.onStoreIdChange();
    this.onWebRoleChange();
  }

  onWebRoleChange() {
    this.setStoreStatus(WebRole[WebRole[this.form.value.webRole]]);

    this.form.controls.positionTitle.valueChanges.subscribe((v) =>
      this.setStoreStatus(WebRole[WebRole[v]])
    );
  }

  setStoreStatus(role: WebRole) {
    if (this.isStoreUser(role)) {
      this.form.controls.storeId.enable({ emitEvent: false });
      this.form.controls.storeName.enable({ emitEvent: false });
    } else {
      this.form.controls.storeId.patchValue('');
      this.form.controls.storeName.patchValue('');
      this.form.controls.storeId.disable({ emitEvent: false });
      this.form.controls.storeName.disable({ emitEvent: false });
    }
  }

  onStoreIdChange() {
    this.form.controls.storeId.valueChanges.subscribe((v) => {
      if (v.trim() === '') {
        return;
      }

      const storeSelected = this.stores.find(
        (s) => s.id.toLowerCase() === v.toLowerCase()
      );
      this.form.patchValue({
        storeName: storeSelected.name,
      });
    });
  }

  isStoreUser(value: WebRole) {
    return this.validStoreUsers.includes(value);
  }

  setAllowedRoles() {
    this.roles = Object.keys(WebRole)
      .map((key) => WebRole[key])
      .filter(
        (value) =>
          typeof value === 'string' && WebRole[value] < WebRole.SITE_ADMIN
      ) as string[];
  }
}
