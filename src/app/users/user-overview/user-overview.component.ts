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

  constructor(private userService: UserService, private router: Router) {
    this.dataloader = this.getUserDataLoader();
  }

  getUserDataLoader() {
    return this.getUsers(this.getParams());
  }

  getUsers(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }

  onSearch(value: any) {
    if (value.trim() === '') {
      this.dataloader = this.getUserDataLoader();
    } else {
      this.dataloader = this.getUsers(this.generateSearchParams(value));
    }
  }

  getParams() {
    return this.userService.getUserAccessMap();
  }

  generateSearchParams(value: any) {
    return this.getParams().set('search', value);
  }

  handleClick(event: any) {
    this.router.navigate([`/user/${event.id}/details`]);
  }

  onAddUser() {
    this.router.navigate(['/user/add-user']);
  }
}
