import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-overview.component.html',
})
export class UserOverviewComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  dataloader: User[];
  GRID_TAG = 'GRID_USERS_GRID';

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(this.getParams()).subscribe((res) => (this.dataloader = res));
  }

  getUserDataLoader() {
    return this.getUsers(this.getParams());
  }

  getUsers(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }

  onSearch(value: any) {
    if (value.trim() === '') {
      this.getUserDataLoader().subscribe((res) => (this.dataloader = res));
    } else {
      this.getUsers(this.generateSearchParams(value)).subscribe(
        (res) => (this.dataloader = res)
      );
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
