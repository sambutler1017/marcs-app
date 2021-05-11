import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ik-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss'],
})
export class AppPageComponent implements OnInit {
  @Input() appName: string;
  constructor() {}

  ngOnInit(): void {}
}
