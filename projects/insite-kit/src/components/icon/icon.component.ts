import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ik-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon: string;
  @Output() iconClick = new EventEmitter<any>();

  iconClass: string;

  ngOnInit() {
    this.iconClass = `${this.icon}-icon`;
  }

  onClick() {
    console.log('click callllllleeeeedddddd');
    this.iconClick.emit();
  }
}
