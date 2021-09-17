import { Component } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/stores/en.json';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent {
  stores = json;
  constructor() {}
}
