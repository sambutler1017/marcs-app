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
  storageTag = 'gridCurrentPage';

  totalPages = 0;
  pageSize = 0;
  activePage = 1;
  pages: any;

  pageChange = new Subject<void>();

  initPager(size: number, key: string, tag: string) {
    this.pageSize = size;
    this.translationKey = key;
    this.storageTag = tag;
  }

  update(dataSize: number, page: number) {
    this.dataLength = dataSize;
    this.activePage = page;
    this.totalPages = Math.ceil(dataSize / this.pageSize);
    this.updatePageFooter(this.activePage);
  }

  updateRoute(page: number) {
    localStorage.setItem(this.storageTag, `${page}`);
    this.pageChange.next();
  }

  pageClick(page: number) {
    this.activePage = page;
    this.updateRoute(this.activePage);
  }

  onNextPageClick() {
    if (this.activePage < this.totalPages) {
      this.updateRoute(++this.activePage);
    }
  }

  onPreviousPageClick() {
    if (this.activePage > 1) {
      this.updateRoute(--this.activePage);
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
