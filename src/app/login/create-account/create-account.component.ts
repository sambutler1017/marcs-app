import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    this.loading = true;

    let user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      storeId: this.form.value.storeId.toUpperCase(),
    };

    this.userService.createUser(user).subscribe((res) => {
      this.loading = false;
      this.toastService.success(
        'Account created Successfully! You will receieve an email with information about your account status.'
      );
      this.router.navigate(['/overview']);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      storeId: ['', Validators.required],
      storeName: ['', Validators.required],
    });

    this.onStoreIdChange();
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
}
