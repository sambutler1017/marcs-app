import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
@Component({
  selector: 'app-vacation-notes-card',
  templateUrl: './vacation-notes-card.component.html',
  styleUrls: ['./vacation-notes-card.component.scss'],
})
export class VacationNotesCardComponent extends BaseComponent
  implements OnInit, OnDestroy {
  @Input() data: string;
  destroy = new Subject();

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(public notificationService: NotificationService) {
    super(notificationService);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy.next();
  }

  onEditNotes() {}
}
