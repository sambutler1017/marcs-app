import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../service/common/common.service';

@Component({
  selector: 'ik-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss'],
})
export class GridCardComponent implements OnInit {
  @Input() dataLoader: any[];
  @Input() excludedColumns = [];
  @Input() translationKey: any;
  @Input() editRoute: string;
  @Output() deleteClick = new EventEmitter<any>();

  content = [];
  cardTitle: string;
  columns: any;
  eventData: any;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.eventData = this.commonService.copyObject(this.dataLoader);
    this.cardTitle = this.translationKey.title;

    this.excludedColumns.forEach((value) =>
      this.dataLoader.forEach((v) => {
        delete v[value];
        this.content.push(Object.values(v));
      })
    );

    this.columns =
      this.dataLoader.length === 0 ? [] : Object.keys(this.dataLoader[0]);
  }

  onRowClick(row: number) {
    this.deleteClick.emit(this.eventData[row]);
  }
}
