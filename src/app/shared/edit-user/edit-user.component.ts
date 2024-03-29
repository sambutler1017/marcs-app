import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject();
  userId: number;
  userUpdating: User;

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((p) => p.id),
        tap((id) => (this.userId = id)),
        switchMap((id) => this.userService.getUserById(id)),
        takeUntil(this.destroy)
      )
      .subscribe((user) => {
        this.userUpdating = user;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(user: User) {
    this.loading = true;

    this.userService.updateUserById(this.userId, user).subscribe(
      () => {
        this.onCancelClick();
        this.toastService.success('Manager Successfully updated!');
      },
      (err) => {
        this.toastService.error('Manager could not be updated at this time!');
        this.loading = false;
      }
    );
  }
}
