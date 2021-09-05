import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonService } from '../../service/common/common.service';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnChanges {
  @Input() dataLoader: any[];
  @Input() translationKey: any;
  @Input() outputEventColumns = [];
  @Input() columnsToExclude = [];
  @Input() pageSize = 25;
  @Input() searchEnabled = false;
  @Input() pagerEnabled = false;
  @Output() gridRowClick = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  columns = [];
  content = [[]];
  outputData = [{}];
  cachedDataLoader: any;
  currentPageIndex = 0;
  currentPageRowCount = 0;
  dataCountTranslation = 'No Items';

  pages: any;
  totalPages = 0;
  constructor(private common: CommonService) {}

  ngOnChanges(): void {
    if (!this.dataLoader) {
      return;
    }

    this.totalPages = Math.ceil(this.dataLoader.length / this.pageSize);

    this.excludeColumns();

    Object.keys(this.dataLoader[0]).forEach((value) =>
      this.columns.push(this.translationKey.grid.columns[value])
    );

    this.getPageData();
    this.getTotal();
  }

  onSearch(value: string) {
    this.resetData();
    this.search.emit(value);
  }

  resetData() {
    this.columns = [];
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
      this.getPageData();
    }
  }

  onPreviousPageClick() {
    if (this.currentPageIndex > this.pageSize) {
      this.currentPageIndex =
        this.currentPageIndex - this.pageSize - this.currentPageRowCount;
      this.getPageData();
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
        Object.values(this.dataLoader[this.currentPageIndex++])
      );
      this.currentPageRowCount++;
    }
    this.updatePageFooter();
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
    this.getPageData();
  }

  getTotal() {
    if (this.dataLoader.length === 0) {
      this.dataCountTranslation = 'No Items';
    } else {
      this.dataCountTranslation = `${this.dataLoader.length} ${this.translationKey.grid.total}`;
    }
  }
}
