import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  roles: string[];
  form: FormGroup;
  storesLoading = true;
  validManagers: any = [
    WebRole[WebRole.EMPLOYEE],
    WebRole[WebRole.CUSTOMER_SERVICE_MANAGER],
    WebRole[WebRole.ASSISTANT_MANAGER],
    WebRole[WebRole.STORE_MANAGER],
  ];

  stores: Store[];
  WebRole = WebRole;

  constructor(
    private storeService: StoreService,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.roles = this.userService.getAllowedRolesToCreate();
    this.storesLoading = true;
    this.buildForm();

    this.storeService.getStores(this.getStoreFilter()).subscribe((res) => {
      this.stores = res;
      this.checkUserCreating();
      this.storesLoading = false;
    });
  }

  getStoreFilter() {
    return this.userData ? null : this.userService.getUserAccessMap();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.userData ? this.userData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.userData ? this.userData.lastName : '',
        Validators.required,
      ],
      email: [this.userData ? this.userData.email : ''],
      webRole: this.userData
        ? this.userData.webRole.toUpperCase()
        : WebRole[WebRole.EMPLOYEE].toUpperCase(),
      storeId: [
        this.userData ? this.userData.storeId : '',
        Validators.required,
      ],
      storeName: [
        this.userData ? this.userData.storeName : '',
        Validators.required,
      ],
      hireDate: this.userData ? this.userData.hireDate : '',
    });

    if (this.disableRoleUpdate) {
      this.form.controls.webRole.disable({ emitEvent: false });
    }

    this.onStoreIdChange();
    this.onWebRoleChange();
  }

  checkUserCreating() {
    const store = this.jwt.get('storeId');

    if (store) {
      this.form.controls.webRole.disable({ emitEvent: false });
      this.form.controls.storeId.disable({ emitEvent: false });
      this.form.controls.storeName.disable({ emitEvent: false });
      this.form.patchValue({
        storeId: store,
        storeName: this.findStoreById(store).name,
      });
    }
  }

  onStoreIdChange() {
    this.form.controls.storeId.valueChanges.subscribe((v) => {
      if (v.trim() === '') {
        return;
      }

      this.form.patchValue({
        storeName: this.findStoreById(v).name,
      });
    });
  }

  onWebRoleChange() {
    this.setStoreStatus(WebRole[WebRole[this.form.value.webRole]]);

    this.form.controls.webRole.valueChanges.subscribe((v) =>
      this.setStoreStatus(WebRole[WebRole[v]])
    );
  }

  setStoreStatus(role: WebRole) {
    if (this.isManager(role)) {
      this.form.controls.storeId.enable({ emitEvent: false });
      this.form.controls.storeName.enable({ emitEvent: false });
    } else {
      this.form.controls.storeId.patchValue('');
      this.form.controls.storeName.patchValue('');
      this.form.controls.storeId.disable({ emitEvent: false });
      this.form.controls.storeName.disable({ emitEvent: false });
    }
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let user: User = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      webRole: this.form.getRawValue().webRole,
      storeId: this.form.getRawValue().storeId.toUpperCase(),
      hireDate: this.form.value.hireDate,
    };

    if (this.form.value.email) {
      user.email = this.form.value.email.trim();
    }

    this.save.emit(user);
  }

  isManager(value: WebRole) {
    return this.validManagers.includes(value);
  }

  findStoreById(stId: any) {
    return this.stores.find((s) => s.id.toLowerCase() === stId.toLowerCase());
  }
}
