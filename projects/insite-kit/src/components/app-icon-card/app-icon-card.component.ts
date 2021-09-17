import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ik-icon-card',
  templateUrl: './app-icon-card.component.html',
  styleUrls: ['./app-icon-card.component.scss'],
})
export class AppIconCardComponent implements OnInit {
  @Input() icon: string;
  @Input() paragraph: string;
  @Input() appName: string;
  @Input() pageRoute = 'home';
  @Input() width = 96;
  @Input() height = 96;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToApp() {
    this.router.navigate([this.pageRoute]);
  }
}
