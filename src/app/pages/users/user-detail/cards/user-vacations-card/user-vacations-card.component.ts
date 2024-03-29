import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import {
  Access,
  AppFeature,
} from 'projects/insite-kit/src/models/common.model';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { VacationService } from 'src/service/vacation-service/vacation.service';
import { AddUserVacationModalComponent } from '../../modals/add-user-vacation-modal/add-user-vacation-modal.component';

@Component({
  selector: 'app-user-vacations-card',
  templateUrl: './user-vacations-card.component.html',
  styleUrls: ['./user-vacations-card.component.scss'],
})
export class UserVacationsCardComponent implements OnInit, OnDestroy {
  @ViewChild(AddUserVacationModalComponent)
  addVacationModalComponent: AddUserVacationModalComponent;
  @ViewChild(GridComponent) userVacationsGrid: GridComponent;
  @Input() canEdit: boolean = false;

  vacationDataLoader: any;
  userId: number;
  vacationEditRoute: string;

  Feature = AppFeature;
  Access = Access;
  destroy = new Subject<void>();
  plusIcon = faPlus;

  constructor(
    private readonly vacationService: VacationService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        tap((p) => (this.userId = p.id)),
        tap(() => (this.vacationDataLoader = this.getVacationDataLoader())),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  getVacationDataLoader() {
    return (params: any) =>
      this.vacationService.getVacationsByUserId(this.userId, params);
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onVacationSave(event: any) {
    this.userVacationsGrid.refresh();
  }

  onVacationEditClick() {
    this.router.navigate([`/user/${this.userId}/details/vacations/edit`]);
  }

  onShowAllClick() {
    this.router.navigate([`/user/${this.userId}/details/vacations`]);
  }

  onRowClick(event: any) {
    if (this.canEdit) {
      this.router.navigate([
        `/user/${this.userId}/details/vacations/${event.id}/details`,
      ]);
    }
  }
}
