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
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GridDataloader } from '../../models/grid.model';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridParamBuilder } from './grid-param-builder/grid-param-builder.component';
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

  @Input() dataLoader: GridDataloader;
  @Input() basePath = '';
  @Input() overflowEnabled = false;

  @Output() rowClick = new EventEmitter<any>();

  activePage = 1;
  loading = true;
  initialLoadComplete = false;

  destroy = new Subject<void>();
  stopListeningForData = new Subject<void>();
  dataSubject = new Subject<HttpResponse<any[]>>();

  data: HttpResponse<any[]>;

  /**
   * After the view has rendered then check the dataloader to see if a value
   * exists and set initial load to be true.
   */
  ngAfterViewInit() {
    this.checkDataLoader();
    this.initialLoadComplete = true;
  }

  /**
   * List for changes to the component. If the dataloader is updated,
   * reload the grid.
   */
  ngOnChanges() {
    if (this.initialLoadComplete) {
      this.checkDataLoader();
    }
  }

  /**
   * Checks to see if the dataloader passed in is defined. If it is then it will
   * intialize the grid, otherwise it will continue loading.
   */
  checkDataLoader() {
    if (this.dataLoader) {
      this.initGrid();
    } else {
      this.loading = true;
    }
  }

  /**
   * Cleans up the subscriptions and confirm the grid is not listening
   * for anymore data changes.
   */
  ngOnDestroy() {
    this.stopListeningForData.next();
    this.destroy.next();
  }

  /**
   * Base intialization for the grid that builds the view and loads the
   * data into the grid.
   */
  initGrid() {
    this.activePage = 1;

    this.initSearchSubscription();
    this.initPageChangeSubscription();
    this.initDataSubscription();

    this.loadData();
  }

  /**
   * Intializes the search subscription. If the user searches on the grid, it will reload
   * the data with those search params and update the grid to reflect the new data.
   *
   * @returns If the grid does not support searching.
   */
  initSearchSubscription() {
    if (!this.gridSearch) {
      return;
    }

    this.gridSearch.search
      .pipe(
        tap(() => (this.activePage = 1)),
        takeUntil(this.destroy)
      )
      .subscribe((s) => this.loadData(s));
  }

  /**
   * Listens for data changes, if the data subject is triggered it wil update the grid data, checklist
   * and selction if the data has changed. Then update the pager to correctly display the content.
   */
  initDataSubscription() {
    this.dataSubject
      .pipe(
        tap((res) => (this.data = res)),
        tap(() => this.updatePager()),
        tap(() => this.updateShowAll()),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  /**
   * Intialize the pager subscription, whenever a page changes, it needs to update the
   * params and call and update the grid to reflect the new paged data.
   *
   * @returns If the grid does not supporting paging.
   */
  initPageChangeSubscription() {
    if (!this.gridPager) {
      return;
    }

    this.gridPager.pageChange
      .pipe(
        tap((page) => (this.activePage = page)),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.loadData());
  }

  /**
   * Loads the new data into the grid.
   *
   * @param search Optional search to be passed to the dataloader.
   */
  loadData(search?: string) {
    this.loading = true;
    this.stopListeningForData.next();

    this.dataLoader
      .call(this, this.getGridParams(search).build())
      .pipe(takeUntil(this.stopListeningForData))
      .subscribe((res: HttpResponse<any[]>) => this.updateData(res));
  }

  /**
   * Gets the grid params to be passed along to the dataloader. Used for formatting
   * the request params for the dataloader.
   *
   * @param search The search to append to the grid params
   * @returns  The Grid param builder to be passed.
   */
  getGridParams(search?: string): GridParamBuilder {
    return new GridParamBuilder()
      .withPaging(this.activePage, this.gridPager.pageSize)
      .withSearch(search);
  }

  /**
   * Emits the data subject change for the new data to format the grid
   * and the paging if it exists.
   *
   * @param response The response from the dataloader call
   */
  updateData(response: HttpResponse<any[]>) {
    this.dataSubject.next(response);
  }

  /**
   * Updates the pager if the data has changed. If the total count has changed
   * it will pull from the headers if defined, otherwise pull it from the length
   * of the data.
   *
   * @returns If the grid does not support paging.
   */
  updatePager() {
    if (!this.gridPager) {
      return;
    }

    const total =
      Number(this.data.headers.get('total-count')) || this.data.body?.length;
    this.gridPager.update(total, this.activePage);
  }

  /**
   * Updates the show all in the grid.
   *
   * @returns If the grid does not support show all
   */
  updateShowAll() {
    if (!this.gridShowAll) {
      return;
    }

    this.gridShowAll.update(this.data.body.length);
  }

  /**
   * Emits the data on the row that was clicked.
   *
   * @param event The row data to emit.
   */
  onRowClick(event: any) {
    this.rowClick.emit(event);
  }

  /**
   * Refreshes the grid by performing a call on the dataloader to
   * refresh.
   */
  refresh() {
    this.loadData();
  }

  /**
   * Helper methdo to check if a grid value is a date, If it is a date then it
   * will format the date, otherwise just return false.
   *
   * @param value The value to check
   * @returns The formatted date if it is a date.
   */
  isDate(value: any): boolean {
    if (typeof value === 'number') {
      return false;
    } else {
      let dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
    }
  }
}
