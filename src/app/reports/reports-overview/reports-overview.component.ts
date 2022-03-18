import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { UserReportsService } from 'src/service/user-service/user-reports.service';
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
    private readonly userService: UserService,
    private readonly toastService: ToastrService
  ) {}

  onUserDownloadClick() {
    this.disableDownloads = true;
    this.userReportsService
      .generateUserProfileReport(this.userService.getUserAccessMap())
      .subscribe((res) => {
        saveAs(res, `user-reports-${new Date().getTime()}.csv`);
        this.disableDownloads = false;
        this.toastService.success('User Report downloaded successfully!');
      });
  }
}
