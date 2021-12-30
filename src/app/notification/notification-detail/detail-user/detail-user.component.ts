import { Component, Input } from '@angular/core';
import { User } from 'projects/insite-kit/src/models/user.model';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
})
export class NotificationDetailUserComponent {
  @Input() userData: User;
}
