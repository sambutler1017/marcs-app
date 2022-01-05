import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() backEnabled = false;
  @Output() backClick = new EventEmitter<any>();

  constructor() {}

  onBackClick() {
    this.backClick.emit();
  }
}
