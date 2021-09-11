import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/lib/models/common.model';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt.service';
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

  form: FormGroup;

  stores: Store[];
  WebRole = WebRole;

  constructor(
    private storeService: StoreService,
    private jwt: JwtService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = true;
    this.buildForm();

    this.storeService
      .getStores(
        new Map<string, string>().set('regionalId', this.jwt.get('userId'))
      )
      .subscribe((res) => {
        this.stores = res;
        this.loading = false;
      });
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: this.userData ? this.userData.firstName : '',
      lastName: this.userData ? this.userData.lastName : '',
      email: [
        this.userData ? this.userData.email : '',
        [Validators.required, Validators.email],
      ],
      webRole: this.userData
        ? this.userData.webRole.toUpperCase()
        : WebRole.USER.toUpperCase(),
      storeId: [this.userData ? this.userData.storeId : ''],
      storeName: this.userData ? this.userData.storeName : '',
      hireDate: this.userData ? this.userData.hireDate : '',
    });
    this.onStoreIdChange();
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
}
