import { Component } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
})
export class ManagersComponent {
  managerJson = json;

  constructor() { }
}
