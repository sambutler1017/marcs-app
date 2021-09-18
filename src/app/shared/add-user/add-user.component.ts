import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'projects/insite-kit/src/models/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  loading = true;

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(user: User) {
    this.loading = true;

    this.userService.addUser(user).subscribe(
      () => {
        this.onCancelClick();
        this.toastService.success('User Successfully created!');
      },
      (err) => {
        this.toastService.error('User could not be created!');
        this.loading = false;
      }
    );
  }
}
