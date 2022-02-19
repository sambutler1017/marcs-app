import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridShowAllComponent } from './grid-show-all/grid-show-all.component';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;
  @ContentChild(GridPagerComponent) pager: GridPagerComponent;
  @ContentChild(GridShowAllComponent) showAll: GridShowAllComponent;

  @Input() dataLoader: any[];
  @Input() gridData: any[] = [];
  @Input() translationKey: any;
  @Input() pageSize = 15;
  @Input() searchEnabled = false;
  @Input() padding = true;
  @Input() headerPadding = false;

  @Output() gridRowClick = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  gridContent = [[]];
  gridIndex = 0;

  loading = true;
  destroy = new Subject();
  initialLoadComplete = false;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.checkDataLoader();
    this.initialLoadComplete = true;
  }

  ngOnChanges() {
    if (this.initialLoadComplete) {
      this.checkDataLoader();
    }
  }

  checkDataLoader() {
    if (this.dataLoader) {
      this.initGrid();
    } else {
      this.loading = true;
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  initGrid() {
    this.gridData = this.dataLoader;
    this.loading = false;
    this.listenToRoute();

    if (this.pager) {
      this.pager.initPager(
        this.gridData.length,
        this.gridIndex,
        this.pageSize,
        this.translationKey
      );
    }

    if (this.showAll) {
      this.showAll.init(this.gridData.length);
    }
  }

  listenToRoute() {
    this.route.queryParams.subscribe((params) => {
      if (params.currentPage) {
        this.gridIndex = Number(params.currentPage);
      } else {
        this.gridIndex = 0;
        if (this.pager) {
          this.pager.updateRoute(this.gridIndex);
        }
      }
      this.getPageData();
    });
  }

  onSearch(value: string) {
    this.loading = true;
    this.pager.updateRoute(0);
    this.search.emit(value);
  }

  rowClick(event: number) {
    this.gridRowClick.emit(
      this.gridData[event + this.gridIndex - this.gridContent.length]
    );
  }

  getPageData() {
    this.gridContent = [];

    for (let i = 0; i < this.pageSize && this.gridData[this.gridIndex]; i++) {
      this.gridContent.push(Object.values(this.getRowData(this.gridIndex++)));
    }

    if (this.pager) {
      this.pager.updatePageFooter(this.gridIndex);
    }
  }

  getRowData(index: number) {
    const arrayData = [];
    this.columns?.forEach((col) =>
      arrayData.push(
        this.gridData[index][col.field] ? this.gridData[index][col.field] : '-'
      )
    );
    return arrayData;
  }

  isDate(value: any) {
    if (typeof value === 'number') {
      return false;
    } else {
      let dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
    }
  }
}
