import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { StoreService } from 'src/service/store-service/store-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  roles: string[];
  form: FormGroup;
  storesLoading = true;
  validManagers: any = [
    WebRole[WebRole.CUSTOMER_SERVICE_MANAGER],
    WebRole[WebRole.ASSISTANT_MANAGER],
    WebRole[WebRole.MANAGER],
  ];

  stores: Store[];
  WebRole = WebRole;

  constructor(
    private storeService: StoreService,
    private jwt: JwtService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setAllowedRoles();
    this.storesLoading = true;
    this.buildForm();

    this.storeService.getStores().subscribe((res) => {
      this.stores = res;
      this.storesLoading = false;
    });
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
        : WebRole[WebRole.USER].toUpperCase(),
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
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      webRole: this.form.value.webRole,
      hireDate: this.form.value.hireDate,
    };

    if (this.form.value.storeId) {
      user.storeId = this.form.value.storeId.toUpperCase();
    }

    if (this.form.value.email) {
      user.email = this.form.value.email;
    }

    this.save.emit(user);
  }

  setAllowedRoles() {
    const userRole = WebRole[this.jwt.get('webRole')];
    this.roles = Object.keys(WebRole)
      .map((key) => WebRole[key])
      .filter(
        (value) =>
          (typeof value === 'string' && WebRole[value] < userRole) ||
          this.disableRoleUpdate
      ) as string[];
  }

  isManager(value: WebRole) {
    return this.validManagers.includes(value);
  }
}
