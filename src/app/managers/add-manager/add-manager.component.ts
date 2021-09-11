import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss'],
})
export class AddManagerComponent {
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
        this.toastService.success('Manager Successfully created!');
      },
      (err) => {
        this.toastService.error('Manager could not be created!');
        this.loading = false;
      }
    );
  }
}
