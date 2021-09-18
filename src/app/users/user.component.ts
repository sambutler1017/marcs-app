import { Component } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  userJson = json;

  constructor() {}
}
