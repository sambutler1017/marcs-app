import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() backEnabled = false;

  constructor(private location: Location) {}

  onBackClick() {
    this.location.back();
  }
}
