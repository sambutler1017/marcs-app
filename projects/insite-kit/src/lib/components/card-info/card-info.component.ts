import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ik-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  @Input() header: string;
  @Input() text: string;
  constructor() {}

  ngOnInit(): void {}
}
