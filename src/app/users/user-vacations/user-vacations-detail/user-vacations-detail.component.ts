import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-vacations-detail',
  templateUrl: './user-vacations-detail.component.html',
})
export class UserVacationsDetailComponent extends BaseComponent
  implements OnInit, OnDestroy {
  @ViewChild('deleteVacationModal') deleteVacationModal: ModalComponent;

  destroy = new Subject();
  vacationId: number;
  vacationData: Vacation;
  loading = false;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly vacationService: VacationService,
    private readonly toastService: ToastrService,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((p) => (this.vacationId = p.vacId)),
        switchMap(() => this.vacationService.getVacationById(this.vacationId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.vacationData = res;
        this.triggerNotificationUpdate();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onBackClick() {
    this.location.back();
  }

  onOpenDeleteModal() {
    console.log('In delete modal');
    this.deleteVacationModal.open();
  }

  onDeleteVacation() {
    this.loading = true;
    this.vacationService.deleteVacationById(this.vacationId).subscribe(
      (res) => {
        this.loading = false;
        this.deleteVacationModal.close();
        this.toastService.success('Vacation sucessfully deleted!');
        this.location.back();
      },
      (err) => {
        this.loading = false;
        this.deleteVacationModal.close();
        this.toastService.success(
          'Vacation could not be deleted. Try again later.'
        );
      }
    );
  }
}
