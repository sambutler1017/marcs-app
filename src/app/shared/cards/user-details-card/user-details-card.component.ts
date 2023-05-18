import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  AppFeature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent implements OnInit {
  @Input() user: User;
  @Input() title = 'Details';
  @Input() editEnabled = false;
  @Input() loading = false;
  @Output() editClick = new EventEmitter<any>();

  Feature = AppFeature;
  Access = Access;
  lastLoginFieldAccess = false;
  editIcon = faPenToSquare;

  constructor(private readonly jwt: JwtService) {}

  ngOnInit() {
    this.lastLoginFieldAccess =
      Number(WebRole[this.jwt.get('webRole')]) === WebRole.ADMIN;
  }

  onEditIconClick() {
    this.editClick.emit();
  }
}
