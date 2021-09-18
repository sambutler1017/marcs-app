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
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() loading = true;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  roles: string[];

  form: FormGroup;

  stores: Store[];
  WebRole = WebRole;

  constructor(
    private storeService: StoreService,
    private jwt: JwtService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setAllowedRoles();
    this.loading = true;
    this.buildForm();

    this.storeService
      .getStores(
        new Map<string, string[]>().set('regionalId', [this.jwt.get('userId')])
      )
      .subscribe((res) => {
        this.stores = res;
        this.loading = false;
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
    this.onStoreIdChange();
    this.onWebRoleChange();
  }

  onStoreIdChange() {
    this.form.controls.storeId.valueChanges.subscribe((v) => {
      const storeSelected = this.stores.find(
        (store) => store.id.toLowerCase() === v.toLowerCase()
      );
      this.form.patchValue({
        storeName: storeSelected ? storeSelected.name : '',
      });
    });
  }

  onWebRoleChange() {
    this.setStoreStatus(
      WebRole[WebRole[this.form.value.webRole]] === WebRole[WebRole.MANAGER]
    );
    this.form.controls.webRole.valueChanges.subscribe((v) =>
      this.setStoreStatus(WebRole[WebRole[v]] === WebRole[WebRole.MANAGER])
    );
  }

  setStoreStatus(isManager: boolean) {
    if (isManager) {
      this.form.controls.storeId.enable({ emitEvent: false });
      this.form.controls.storeName.enable({ emitEvent: false });
    } else {
      this.form.controls.storeId.disable({ emitEvent: false });
      this.form.controls.storeName.disable({ emitEvent: false });
    }
    console.log(this.form.invalid);
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      webRole: this.form.value.webRole,
      storeId: this.form.value.storeId.toUpperCase(),
      hireDate: this.form.value.hireDate,
    };

    this.save.emit(user);
  }

  setAllowedRoles() {
    const userRole = WebRole[this.jwt.get('webRole')];
    this.roles = Object.keys(WebRole)
      .map((key) => WebRole[key])
      .filter(
        (value) => typeof value === 'string' && WebRole[value] <= userRole
      ) as string[];
  }
}
