import { Component, OnInit } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/managers/en.json';

@Component({
  selector: 'app-move-manager',
  templateUrl: './move-manager.component.html',
  styleUrls: ['./move-manager.component.scss'],
})
export class MoveManagerComponent implements OnInit {
  managerJson = json;
  constructor() {}

  ngOnInit(): void {}
}
