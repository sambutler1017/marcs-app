import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ik-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() editRoute: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEditClick() {
    this.router.navigate([this.editRoute]);
  }
}
