import { HttpResponse } from '@angular/common/http';
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
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridShowAllComponent } from './grid-show-all/grid-show-all.component';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;
  @ContentChild(GridPagerComponent) gridPager: GridPagerComponent;
  @ContentChild(GridShowAllComponent) gridShowAll: GridShowAllComponent;
  @ContentChild(GridSearchComponent) gridSearch: GridSearchComponent;

  @Input() dataLoader: (
    params: any
  ) => Observable<HttpResponse<any[]>> | ((params: any) => Observable<any[]>);
  @Input() translationKey: any;
  @Input() pageSize = 15;
  @Input() padding = true;
  @Input() basePath = '';
  @Input() overflowEnabled = false;
  @Input() storageTag = 'gridCurrentPage';
  @Input() alwaysDestroy = false;

  @Output() rowClick = new EventEmitter<any>();

  dataloaderData: HttpResponse<any[]>;

  activePage = 0;
  loading = true;
  initialLoadComplete = false;

  SEARCH_TAG = 'search';
  TOTAL_COUNT = 'total-count';

  destroy = new Subject<void>();
  stopListeningForData = new Subject<void>();

  constructor(private readonly router: Router) {}

  ngAfterViewInit() {
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
    if (this.isNewAppRoute() || this.alwaysDestroy) {
      localStorage.removeItem(this.storageTag);
      localStorage.removeItem(this.SEARCH_TAG);
    }
    this.stopListeningForData.next();
    this.destroy.next();
  }

  initGrid() {
    const storedKey = localStorage.getItem(this.storageTag);
    this.activePage = storedKey ? Number(storedKey) : 1;

    this.addGridPager();
    this.addGridSearch();
    this.listenToPageChange();
    this.loadGridData().subscribe();
  }

  onRowClick(event: any) {
    this.rowClick.emit(event);
  }

  refresh() {
    this.loadGridData().subscribe();
  }

  addGridPager() {
    if (this.gridPager) {
      this.gridPager.initPager(
        this.pageSize,
        this.translationKey,
        this.storageTag
      );
    } else {
      this.activePage = 1;
    }
  }

  addGridSearch() {
    this.gridSearch?.search.pipe(takeUntil(this.destroy)).subscribe((v) => {
      this.loading = true;
      if (v === '') {
        localStorage.removeItem(this.SEARCH_TAG);
      } else {
        localStorage.setItem(this.SEARCH_TAG, v);
      }

      this.activePage = 1;
      this.loadGridData().subscribe();
    });
  }

  listenToPageChange() {
    this.gridPager?.pageChange
      .pipe(
        tap(() => this.onGridChange()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  onGridChange() {
    this.activePage = Number(localStorage.getItem(this.storageTag));
    this.loading = true;
    this.loadGridData().subscribe();
  }

  loadGridData(): Observable<any> {
    this.stopListeningForData.next();

    return this.dataLoader.call(this, this.getGridParams()).pipe(
      tap((res: any) => (this.dataloaderData = res)),
      tap(() => this.updatePager()),
      tap(() => this.updateShowAll()),
      tap(() => (this.loading = false)),
      takeUntil(this.stopListeningForData)
    );
  }

  getGridParams() {
    const rowOffsetSize = (this.activePage - 1) * this.pageSize;
    const searchValue = localStorage.getItem(this.SEARCH_TAG);

    const p = new Map();
    p.set('pageSize', [this.pageSize]);
    p.set('rowOffset', [rowOffsetSize]);

    if (searchValue) {
      this.gridSearch.currentSearch = searchValue;
      p.set('search', [searchValue]);
    }
    return p;
  }

  updatePager() {
    if (this.dataloaderData.headers) {
      const total = Number(this.dataloaderData.headers.get(this.TOTAL_COUNT));
      this.gridPager?.update(total, this.activePage);
    } else {
      this.gridPager?.update(0, this.activePage);
    }
  }

  updateShowAll() {
    this.gridShowAll?.update(this.dataloaderData.body.length);
  }

  isDate(value: any) {
    if (typeof value === 'number') {
      return false;
    } else {
      let dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
    }
  }

  isNewAppRoute() {
    return !this.router.url.includes(`/${this.basePath}`);
  }
}
