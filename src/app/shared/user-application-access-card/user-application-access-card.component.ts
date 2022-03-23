import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-application-access-card',
  templateUrl: './user-application-access-card.component.html',
  styleUrls: ['./user-application-access-card.component.scss'],
})
export class UserApplicationAccessCardComponent {
  @Input() loading = false;
  @Input() applications: string[] = [];
}
