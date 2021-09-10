import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebRole } from 'projects/insite-kit/src/lib/models/common.model';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt.service';
import { StoreService } from 'src/service/store-service/store-service.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss'],
})
export class AddManagerComponent implements OnInit {
  addManagerForm: FormGroup;

  stores: Store[];
  loading = true;
  WebRole = WebRole;

  constructor(
    private location: Location,
    private storeService: StoreService,
    private jwt: JwtService,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = true;
    this.buildForm();
    let params: Map<string, string> = new Map<string, string>();
    params.set('regionalId', this.jwt.get('userId'));

    this.storeService.getStores(params).subscribe((res) => {
      this.stores = res;
      this.loading = false;
    });
  }

  buildForm() {
    this.addManagerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      webRole: WebRole.MANAGER.toUpperCase(),
      storeId: [''],
      storeName: '',
      hireDate: '',
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

    this.userService.addUser(user).subscribe(
      () => {
        this.onCancelClick();
        this.toastService.success('Manager Successfully created!');
      },
      (err) => {
        this.toastService.error('Manager could not be created!');
        this.loading = false;
      }
    );
  }
}
