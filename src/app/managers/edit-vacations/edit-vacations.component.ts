import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { VacationService } from 'src/service/vacation-service/vacation.service';
import { Vacation } from 'projects/insite-kit/src/lib/models/vacation.model';

@Component({
  selector: 'app-edit-vacations',
  templateUrl: './edit-vacations.component.html',
  styleUrls: ['./edit-vacations.component.scss']
})
export class EditVacationsComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject();
  userId: number;

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private vacationService: VacationService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.params
    //   .pipe(
    //     map((p) => p.id),
    //     tap((id) => (this.userId = id)),
    //     switchMap((id) => this.vacationService.getUserById(id)),
    //     takeUntil(this.destroy)
    //   )
    //   .subscribe((user) => {
    //     this.userUpdating = user;
    //   });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(user: Vacation) {

  }
}
