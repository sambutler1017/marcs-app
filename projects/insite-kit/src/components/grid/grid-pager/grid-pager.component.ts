import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ik-grid-pager',
  templateUrl: './grid-pager.component.html',
  styleUrls: ['./grid-pager.component.scss'],
})
export class GridPagerComponent {
  dataLength = 0;
  translationKey = '';

  totalPages = 0;
  pageSize = 0;
  activePage = 1;
  pages: any;

  pageChange = new Subject<number>();

  initPager(size: number, key: string) {
    this.pageSize = size;
    this.translationKey = key;
  }

  update(dataSize: number, page: number) {
    this.dataLength = dataSize;
    this.activePage = page;
    this.totalPages = Math.ceil(dataSize / this.pageSize);
    this.updatePageFooter(this.activePage);
  }

  triggerPageChange(page: number) {
    this.pageChange.next(page);
  }

  pageClick(page: number) {
    this.activePage = page;
    this.triggerPageChange(this.activePage);
  }

  onNextPageClick() {
    if (this.activePage < this.totalPages) {
      this.triggerPageChange(++this.activePage);
    }
  }

  onPreviousPageClick() {
    if (this.activePage > 1) {
      this.triggerPageChange(--this.activePage);
    }
  }

  updatePageFooter(page: number) {
    this.activePage = page;

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
    } else if (page === this.totalPages) {
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
}
