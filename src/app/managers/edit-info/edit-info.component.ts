import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store-service.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit, OnDestroy {
  addManagerForm: FormGroup;

  stores: Store[];
  loading = true;
  destroy = new Subject();
  userId: number;

  constructor(
    private location: Location,
    private storeService: StoreService,
    private jwt: JwtService,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = true;
    let params: Map<string, string> = new Map<string, string>();
    params.set('regionalId', this.jwt.get('userId'));

    this.storeService.getStores(params).subscribe((res) => {
      this.stores = res;
      this.loading = false;
    });

    this.route.params
      .pipe(
        map((p) => p.id),
        tap((id) => (this.userId = id)),
        switchMap((id) => this.userService.getUserById(id)),
        takeUntil(this.destroy)
      )
      .subscribe((user) => {
        this.buildForm(user);
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm(user: User) {
    this.addManagerForm = this.fb.group({
      firstName: user.firstName,
      lastName: user.lastName,
      email: [user.email, [Validators.required, Validators.email]],
      webRole: user.webRole.toUpperCase(),
      storeId: user.storeId,
      storeName: user.storeName,
      hireDate: user.hireDate,
    });
    this.onStoreIdChange();
  }

  onStoreIdChange() {
    this.addManagerForm.controls.storeId.valueChanges.subscribe((v) => {
      const storeSelected = this.stores.find(
        (store) => store.id.toLowerCase() === v.toLowerCase()
      );
      this.addManagerForm.patchValue({
        storeName: storeSelected ? storeSelected.name : '',
      });
    });
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick() {
    this.loading = true;

    let user: User = {
      firstName: this.addManagerForm.value.firstName,
      lastName: this.addManagerForm.value.lastName,
      email: this.addManagerForm.value.email,
      webRole: this.addManagerForm.value.webRole,
      storeId: this.addManagerForm.value.storeId.toUpperCase(),
      hireDate: this.addManagerForm.value.hireDate,
    };

    console.log(user);

    this.userService.updateUserById(this.userId, user).subscribe(
      () => {
        this.onCancelClick();
        this.toastService.success('Manager Successfully updated!');
      },
      (err) => {
        this.toastService.error('Manager could not be updated at this time!');
        this.loading = false;
      }
    );
  }
}
