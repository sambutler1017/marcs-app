import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
})
export class DeleteUserModalComponent {
  @ViewChild('deleteUserModal') modal: ModalComponent;
  @Input() userId: number;

  modalLoading = false;

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastrService,
    private readonly router: Router
  ) {}

  onDeleteUser() {
    this.modalLoading = true;
    this.userService.deleteUser(this.userId).subscribe(
      () => {
        this.modal.close();
        this.modalLoading = false;
        this.toastService.success('User successfully deleted!');
        this.router.navigate(['/user']);
      },
      (err) =>
        this.toastService.success('User could not be deleted at this time!')
    );
  }
}
