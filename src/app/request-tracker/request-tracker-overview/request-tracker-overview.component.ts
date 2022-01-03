import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { default as json } from 'projects/insite-kit/src/assets/translations/request-tracker/en.json';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { VacationService } from 'src/service/vacation-service/vacation.service';
@Component({
  selector: 'app-request-tracker-overview',
  templateUrl: './request-tracker-overview.component.html',
  styleUrls: ['./request-tracker-overview.component.scss'],
})
export class RequestTrackerOverviewComponent extends BaseComponent
  implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) requestModal: ModalComponent;
  @ViewChild(GridComponent) grid: GridComponent;

  loading = false;
  requestTrackerJson = json;
  outputEventColumns = ['id', 'regionalId'];
  excludedColumns = [];
  columns = ['startDate', 'endDate', 'status', 'insertDate'];
  dataLoader: Vacation[];
  destroy = new Subject();
  form: FormGroup;

  constructor(
    private readonly vacationService: VacationService,
    public notificationService: NotificationService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastrService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.buildForm();
    this.vacationService.getCurrentUserVacations().subscribe((res) => {
      this.dataLoader = res;
      this.triggerNotificationUpdate();
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.formChange();
  }

  formChange() {
    this.form.controls.startDate.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate: this.vacationChange(v) })
    );
  }

  vacationChange(value: string) {
    if (value.trim() === '') {
      return '';
    }

    const endDate = new Date(value);
    endDate.setDate(endDate.getDate() + 8);
    return formatDate(endDate, 'yyyy-MM-dd', 'en-US');
  }

  onCreateRequest() {
    this.loading = true;
    const vacationRequest = {
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
    };

    this.vacationService
      .requestVacation(vacationRequest)
      .pipe(
        switchMap(() => this.vacationService.getCurrentUserVacations()),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res) => {
          this.grid.resetData();
          this.dataLoader = res;

          this.requestModal.close();
          this.loading = false;
          this.toastService.success('Vacation Request sucessfully sent!');
        },
        (err) => {
          this.requestModal.close();
          this.loading = false;
          this.toastService.error(
            'Vacation Request could not be sent. Please try again later.'
          );
        }
      );
  }

  handleRowClick(event: any) {}
}
