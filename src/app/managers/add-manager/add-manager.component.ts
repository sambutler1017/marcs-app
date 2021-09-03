import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('webRole') webRole: ElementRef;
  @ViewChild('storeName') storeName: ElementRef;
  @ViewChild('storeId') storeId: ElementRef;
  @ViewChild('hireDate') hireDate: ElementRef;

  stores: Store[];
  loading = true;

  WebRole = WebRole;

  constructor(
    private location: Location,
    private storeService: StoreService,
    private jwt: JwtService,
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loading = true;
    let params: Map<string, string> = new Map<string, string>();
    params.set('regionalId', this.jwt.get('userId'));
    this.storeService.getStores(params).subscribe((res) => {
      this.stores = res;
      this.loading = false;
    });
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick() {
    this.loading = true;
    let role: string = this.webRole.nativeElement.value;

    let user: User = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      webRole: WebRole[role.toUpperCase()].toUpperCase(),
      storeId: this.storeId.nativeElement.value,
      hireDate: this.hireDate.nativeElement.value,
    };

    this.userService.createUser(user).subscribe(
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

  onStoreSearch(value: string) {
    this.storeId.nativeElement.value = this.stores.find(
      (v) => v.name.toLowerCase() === value.toLowerCase()
    ).id;
  }
}
