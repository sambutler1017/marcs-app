import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
@Component({
  selector: 'app-user-application-card',
  templateUrl: './user-application-card.component.html',
  styleUrls: ['./user-application-card.component.scss'],
})
export class UserApplicationCardComponent implements OnInit, OnDestroy {
  applications: string[] = [];
  userId: number;
  loading = false;

  destroy = new Subject();

  constructor(
    private readonly userService: UserService,
    private readonly activeRoute: ActivatedRoute,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.activeRoute.params
      .pipe(
        tap((p) => (this.userId = p.id)),
        switchMap(() => this.userService.getUserAppsById(this.userId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.applications = this.commonService.getApplicationList(res);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
