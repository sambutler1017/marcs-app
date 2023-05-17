import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
})
export class StoreFormComponent implements OnInit {
  @Input() storeData: Store;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Store>();

  form: FormGroup;
  regionalAndDistrictManagers: User[];
  usersLoading = true;

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getRegionalAndDistrictManagers().subscribe((res) => {
      this.regionalAndDistrictManagers = res.body;
      this.usersLoading = false;
    });
  }

  getRegionalAndDistrictManagers() {
    const request = new Map<string, any[]>().set('webRole', [
      WebRole[WebRole.REGIONAL_MANAGER],
      WebRole[WebRole.DISTRICT_MANAGER],
    ]);
    return this.userService.getUsers(request);
  }

  buildForm() {
    this.form = this.fb.group({
      storeId: [this.storeData ? this.storeData.id : '', Validators.required],
      storeName: [
        this.storeData ? this.storeData.name : '',
        Validators.required,
      ],
      currentRegionalManager: [
        this.storeData?.regionalManagerId
          ? this.storeData.regionalManagerId
          : '0',
        Validators.required,
      ],
    });

    if (!this.storeData?.regionalManagerId) {
      this.disableSave = true;
    }

    this.form.controls.currentRegionalManager.valueChanges.subscribe(
      (v) => (this.disableSave = Number(v) <= 0)
    );
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let store: Store = {
      id: this.form.value.storeId,
      name: this.form.value.storeName,
      regionalManagerId: this.form.value.currentRegionalManager,
    };

    this.save.emit(store);
  }
}
