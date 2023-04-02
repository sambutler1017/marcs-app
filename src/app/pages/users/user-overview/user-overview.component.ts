import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-overview.component.html',
})
export class UserOverviewComponent {
  @ViewChild(ModalComponent) modal: ModalComponent;
  dataloader: any;

  Feature = Feature;
  Application = App;
  Access = Access;

  tempDataloader: any;

  constructor(private userService: UserService, private router: Router) {
    this.dataloader = (params: any) => this.getUserDataLoader(params);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(this.getParams(params));
  }

  getParams(params?: Map<string, string[]>) {
    if (params) {
      return new Map([
        ...params.entries(),
        ...this.userService.getUserAccessMap().entries(),
      ]);
    }
    return this.userService.getUserAccessMap();
  }

  rowClick(event: any) {
    this.router.navigate([`/user/${event.id}/details`]);
  }

  onAddUser() {
    this.router.navigate(['/user/add-user']);
  }
}
