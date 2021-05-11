import { Component, OnInit } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/stores/en.json';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores = json;
  constructor() {}

  ngOnInit(): void {}
}
