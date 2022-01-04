import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common/common.service';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnChanges {
  @Input() dataLoader: any[];
  @Input() outputEventColumns = [];
  @Input() columnsToExclude = [];
  @Input() columns = [];
  @Input() noDataText = 'No Items';
  @Input() translationKey: any;
  @Input() pageSize = 25;
  @Input() searchEnabled = false;
  @Input() pagerEnabled = false;
  @Input() title;
  @Input() padding = true;
  @Input() headerPadding = false;
  @Output() gridRowClick = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  content = [[]];
  outputData = [{}];
  cachedDataLoader: any;
  currentPageIndex = 0;
  currentPageRowCount = 0;
  dataCountTranslation = 'No Items';
  noItems = false;
  loading = true;

  pages: any;
  totalPages = 0;
  constructor(
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(): void {
    if (!this.dataLoader) {
      this.loading = true;
      return;
    }

    this.route.queryParams.subscribe((params) => {
      if (params.currentPage) {
        this.currentPageIndex = Number(params.currentPage);
      } else {
        this.currentPageIndex = 0;
        if (this.pagerEnabled) {
          this.updateRoute(this.currentPageIndex);
        }
      }
      this.getPageData();
    });

    if (this.dataLoader.length <= 0) {
      this.noItems = true;
      this.loading = false;
      return;
    } else {
      this.loading = false;
      this.noItems = false;
    }

    this.totalPages = Math.ceil(this.dataLoader.length / this.pageSize);

    this.excludeColumns();
    // this.getPageData();
    this.getTotal();
  }

  updateRoute(value: number) {
    this.router.navigate([], {
      queryParams: {
        currentPage: value,
      },
    });
  }

  onSearch(value: string) {
    this.loading = true;
    this.resetData();
    this.updateRoute(0);
    this.search.emit(value);
  }

  resetData() {
    this.content = [[]];
    this.outputData = [{}];
    this.currentPageIndex = 0;
    this.currentPageRowCount = 0;
  }

  excludeColumns() {
    this.outputData = this.common.copyObject(this.dataLoader);

    this.outputData.forEach((value) =>
      Object.keys(value).forEach((key) => {
        if (!this.outputEventColumns.includes(key)) {
          delete value[key];
        }
      })
    );

    this.columnsToExclude.forEach((d) =>
      this.dataLoader.forEach((value) => delete value[d])
    );

    this.cachedDataLoader = this.common.copyObject(this.dataLoader);
  }

  rowClick(event: number) {
    this.gridRowClick.emit(
      this.outputData[event + this.currentPageIndex - this.content.length]
    );
  }

  onNextPageClick() {
    if (this.currentPageIndex < this.dataLoader.length) {
      this.updateRoute(this.currentPageIndex);
    }
  }

  onPreviousPageClick() {
    if (this.currentPageIndex > this.pageSize) {
      this.currentPageIndex =
        this.currentPageIndex - this.pageSize - this.currentPageRowCount;
      this.updateRoute(this.currentPageIndex);
    }
  }

  getPageData() {
    this.content = [];
    this.currentPageRowCount = 0;

    for (
      let i = 0;
      i < this.pageSize && this.dataLoader[this.currentPageIndex];
      i++
    ) {
      this.content.push(
        Object.values(this.getRowData(this.currentPageIndex++))
      );
      this.currentPageRowCount++;
    }
    this.updatePageFooter();
  }

  getRowData(index: number) {
    const arrayData = [];
    this.columns.forEach((col) =>
      arrayData.push(
        this.dataLoader[index][col] ? this.dataLoader[index][col] : '-'
      )
    );
    return arrayData;
  }

  updatePageFooter() {
    const page = Math.ceil(this.currentPageIndex / this.pageSize);

    if (page === 1) {
      this.pages = [
        {
          pageNum: page,
          active: true,
        },
        {
          pageNum: page + 1,
          active: false,
        },
        {
          pageNum: page + 2,
          active: false,
        },
      ];
    } else if (page === Math.ceil(this.dataLoader.length / this.pageSize)) {
      this.pages = [
        {
          pageNum: page - 2,
          active: false,
        },
        {
          pageNum: page - 1,
          active: false,
        },
        {
          pageNum: page,
          active: true,
        },
      ];
    } else {
      this.pages = [
        {
          pageNum: page - 1,
          active: false,
        },
        {
          pageNum: page,
          active: true,
        },
        {
          pageNum: page + 1,
          active: false,
        },
      ];
    }
  }

  pageClick(page: number) {
    this.currentPageIndex = page * this.pageSize - this.pageSize;
    this.updateRoute(this.currentPageIndex);
  }

  getTotal() {
    if (this.dataLoader.length === 0) {
      this.dataCountTranslation = 'No Items';
    } else {
      this.dataCountTranslation = `${this.dataLoader.length} ${this.translationKey.grid.total}`;
    }
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
