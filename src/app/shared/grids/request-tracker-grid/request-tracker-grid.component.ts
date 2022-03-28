import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
@Component({
  selector: 'app-request-tracker-grid',
  templateUrl: './request-tracker-grid.component.html',
  styleUrls: ['./request-tracker-grid.component.scss'],
})
export class RequestTrackerGridComponent {
  @ViewChild(GridComponent) grid: GridComponent;

  @Input() dataLoader: Vacation[];
  @Output() rowClick = new EventEmitter<any>();

  constructor() {}

  handleRowClick(event: any) {
    this.rowClick.emit(event);
  }
}
