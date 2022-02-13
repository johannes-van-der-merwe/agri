import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import jsonData from '../../assets/data/blocks.json';
import { MatListModule } from '@angular/material/list/list-module';
import { Component, OnInit } from '@angular/core';

// REVIEW / | undefined
export interface AreaManagementTableItem {
  status: string;
  name: string;
  farmName: string;
  variant?: string | null;
  size: number;
  createdAt: string;
  deletedAt?: string | null;
}

const AREA_MANAGEMENT_DATA: AreaManagementTableItem[] = jsonData;

@Component({
  template: ''
})
/**
 * Data source for the AreaManagementTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AreaManagementTableDataSource extends DataSource<AreaManagementTableItem> implements OnInit {
  data: AreaManagementTableItem[] = AREA_MANAGEMENT_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  list: MatListModule | undefined;
  // FarmFilter: String | undefined;
  // filter: filter | undefined;
  constructor() {
    super();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  connect(): Observable<AreaManagementTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.

      // NOTE PAGINATION
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange).pipe(map(() =>
        this.getPagedData(this.getSortedData([...this.data])
        )));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AreaManagementTableItem[]): AreaManagementTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }
  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AreaManagementTableItem[]): AreaManagementTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      // NOTE mixed string  ordering 
      const compare = (a: string, b: string, isAsc: boolean): number => {
        const reA = /[^a-zA-Z]/g;
        const reN = /[^0-9]/g;

        const aInt = parseInt(a, 10);
        const bInt = parseInt(b, 10);
        if (isAsc === true) {
          if (isNaN(aInt) && isNaN(bInt)) {
            const aA = a.replace(reA, "");
            const bA = b.replace(reA, "");
            if (aA === bA) {
              const aN = parseInt(a.replace(reN, ""), 10);
              const bN = parseInt(b.replace(reN, ""), 10);
              return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
              return aA > bA ? 1 : -1;
            }

            // NOTE A is not an Int
          } else if (isNaN(aInt)) {

            // NOTE B is not an Int
            return 1;
          } else if (isNaN(bInt)) {
            return -1;
            // NOTE To make alphanumeric sort first return 1 here
          } else {
            return aInt > bInt ? 1 : -1;
          }
        } else {
          if (isNaN(aInt) && isNaN(bInt)) {
            const aA = a.replace(reA, "");
            const bA = b.replace(reA, "");
            if (aA === bA) {
              const aN = parseInt(a.replace(reN, ""), 10);
              const bN = parseInt(b.replace(reN, ""), 10);
              return aN === bN ? 0 : aN < bN ? 1 : -1;
            } else {
              return aA < bA ? 1 : -1;
            }

            // NOTE A is not an Int
          } else if (isNaN(aInt)) {
            // NOTE To make alphanumeric sort first return -1 here
            return 1;
            // NOTE B is not an Int
          } else if (isNaN(bInt)) {
            //NOTE To make alphanumeric sort first return 1 here
            return -1;
          } else {
            return aInt > bInt ? 1 : -1;
          }
        }
      }
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}
