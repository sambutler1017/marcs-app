import { HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-request-tracker-grid',
  templateUrl: './request-tracker-grid.component.html',
  styleUrls: ['./request-tracker-grid.component.scss'],
})
export class RequestTrackerGridComponent {
  @ViewChild(GridComponent) grid: GridComponent;

  @Input() dataLoader: (params: any) => Observable<HttpResponse<any>>;
  @Output() rowClick = new EventEmitter<any>();

  handleRowClick(event: any) {
    this.rowClick.emit(event);
  }
}
