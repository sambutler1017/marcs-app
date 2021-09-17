import { Component, OnInit } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/request-tracker/en.json';

@Component({
  selector: 'app-request-tracker',
  templateUrl: './request-tracker.component.html',
  styleUrls: ['./request-tracker.component.scss'],
})
export class RequestTrackerComponent implements OnInit {
  requestTracker = json;
  constructor() {}

  ngOnInit(): void {}
}
