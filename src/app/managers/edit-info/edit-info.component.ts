import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent {
  constructor(private location: Location) {}

  onCancel() {
    this.location.back();
  }
}
