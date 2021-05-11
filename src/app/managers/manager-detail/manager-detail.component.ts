import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';
import {
  ManagerDetail,
  Vacation,
} from 'projects/insite-kit/src/lib/models/manager.model';
import { ManagerService } from 'projects/insite-kit/src/lib/service/manager-service/manager-service.service';

@Component({
  selector: 'app-manager-detail',
  templateUrl: './manager-detail.component.html',
  styleUrls: ['./manager-detail.component.scss'],
})
export class ManagerDetailComponent implements OnInit {
  manager: ManagerDetail;
  vacations: Vacation[];
  managerJson = json;
  excludedColumns = ['id'];
  infoEditRoute: string;
  vacationEditRoute: string;

  constructor(
    private managerService: ManagerService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params: any = this.activeRoute.params;
    this.infoEditRoute = `/managers/details/${params.value.id}/edit/info`;
    this.vacationEditRoute = `/managers/details/${params.value.id}/edit/vacations`;

    this.managerService
      .getManagerDetail(params.value.id)
      .subscribe((res: ManagerDetail) => {
        this.manager = res;
        this.vacations = res.vacations;

        delete this.manager.vacations;
        delete this.manager.regionalId;
        delete this.manager.id;
      });
  }

  onMoveClick() {
    this.router.navigate(['/managers/move-manager']);
  }

  onDeleteVacation(event: any) {
    console.log(event);
  }
}
