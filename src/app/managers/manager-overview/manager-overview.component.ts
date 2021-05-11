import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';
import { Manager } from 'projects/insite-kit/src/lib/models/manager.model';
import { ManagerService } from 'projects/insite-kit/src/lib/service/manager-service/manager-service.service';

@Component({
  selector: 'app-manager-content',
  templateUrl: './manager-overview.component.html',
  styleUrls: ['./manager-overview.component.scss'],
})
export class ManagerOverviewComponent implements OnInit {
  managerJson = json;
  outputEventColumns = ['id', 'regionalId'];
  excludedColumns = ['id', 'regionalId'];
  dataLoader: Manager[];
  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit() {
    this.managerService.getManagers().subscribe((res: Manager[]) => {
      this.dataLoader = res;
    });
  }

  handleClick(event: any) {
    this.router.navigate([`/managers/details/${event.id}`]);
  }

  onAddManager() {
    this.router.navigate(['/managers/add-manager']);
  }
}
