import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';

@Component({
  selector: 'app-user-detail-card',
  templateUrl: './user-detail-card.component.html',
  styleUrls: ['./user-detail-card.component.scss'],
})
export class UserDetailCardComponent {
  @Input() canEdit: boolean = false;
  @Input() user: User;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(private readonly router: Router) {}

  onUserEditClick() {
    this.router.navigate([`/user/${this.user.id}/details/edit/info`]);
  }
}
