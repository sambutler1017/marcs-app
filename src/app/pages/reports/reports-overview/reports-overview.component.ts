import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { UserReportsService } from 'src/service/reports-service/user-reports.service';
import { VacationReportsService } from 'src/service/reports-service/vacation-reports.service';

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
    private readonly popupService: PopupService
  ) {}

  onUserDownloadClick() {
    this.disableDownloads = true;
    this.userReportsService.generateUserProfileReport().subscribe({
      next: (report) => this.downloadSuccess(report, 'user-reports'),
      error: () => this.downloadError(),
    });
  }

  onUserVacationDownloadClick() {
    this.disableDownloads = true;
    this.vacationReportsService.generateUserVacationsReport().subscribe({
      next: (report) => this.downloadSuccess(report, 'vacation-reports'),
      error: () => this.downloadError(),
    });
  }

  downloadSuccess(res: any, fileName: string) {
    saveAs(res, `${fileName}-${new Date().getTime()}.csv`);
    this.disableDownloads = false;
    this.popupService.success('Report downloaded successfully!');
  }

  downloadError() {
    this.disableDownloads = false;
    this.popupService.error(
      'Report could not be downloaded at this time. Try again later.'
    );
  }
}
