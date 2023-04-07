import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
@Component({
  selector: 'app-request-tracker-wizard',
  templateUrl: './request-tracker-wizard.component.html',
  styleUrls: ['./request-tracker-wizard.component.scss'],
})
export class RequestTrackerWizardComponent {
  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(private readonly router: Router) {}

  onBackClick() {
    this.router.navigate(['/request-tracker']);
  }
}
