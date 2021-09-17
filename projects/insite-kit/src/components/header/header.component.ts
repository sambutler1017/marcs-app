import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ik-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backEnabled = false;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onBackClick() {
    this.location.back();
  }
}
