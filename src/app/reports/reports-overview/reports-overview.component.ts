import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { UserReportsService } from 'src/service/reports-service/user-reports.service';
import { VacationReportsService } from 'src/service/reports-service/vacation-reports.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-reports-overview',
  templateUrl: './reports-overview.component.html',
  styleUrls: ['./reports-overview.component.scss'],
})
export class ReportsOverviewComponent {
  disableDownloads = false;

  constructor(
    private readonly userReportsService: UserReportsService,
    private readonly vacationReportsService: VacationReportsService,
    private readonly userService: UserService,
    private readonly toastService: ToastrService
  ) {}

  onUserDownloadClick() {
    this.disableDownloads = true;
    this.userReportsService
      .generateUserProfileReport(this.userService.getUserAccessMap())
      .subscribe(
        (report) => this.downloadSuccess(report, 'user-reports'),
        (error) => this.downloadError()
      );
  }

  onUserVacationDownloadClick() {
    this.disableDownloads = true;
    this.vacationReportsService
      .generateUserVacationsReport(this.userService.getUserAccessMap())
      .subscribe(
        (report) => this.downloadSuccess(report, 'vacation-reports'),
        (error) => this.downloadError()
      );
  }

  downloadSuccess(res: any, fileName: string) {
    saveAs(res, `${fileName}-${new Date().getTime()}.csv`);
    this.disableDownloads = false;
    this.toastService.success('Report downloaded successfully!');
  }

  downloadError() {
    this.disableDownloads = false;
    this.toastService.error(
      'Report could not be downloaded at this time. Try again later.'
    );
  }
}
