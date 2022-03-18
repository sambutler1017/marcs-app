import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { UserReportsService } from 'src/service/user-service/user-reports.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-reports-overview',
  templateUrl: './reports-overview.component.html',
  styleUrls: ['./reports-overview.component.scss'],
})
export class ReportsOverviewComponent {
  constructor(
    private readonly userReportsService: UserReportsService,
    private readonly userService: UserService
  ) {}

  onUserDownloadClick() {
    this.userReportsService
      .generateUserProfileReport(this.userService.getUserAccessMap())
      .subscribe((res) =>
        saveAs(res, `user-reports-${new Date().getTime()}.csv`)
      );
  }
}
