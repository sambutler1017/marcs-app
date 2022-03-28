import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent {
  @Input() user: User;
  @Input() title = 'Details';
  @Input() editEnabled = false;
  @Input() loading = false;
  @Output() editClick = new EventEmitter<any>();

  Feature = Feature;
  Application = App;
  Access = Access;

  onEditIconClick() {
    this.editClick.emit();
  }
}
