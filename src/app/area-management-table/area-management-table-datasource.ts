import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// REVIEW / | undefined
export interface AreaManagementTableItem {
  status: string;
  name: string;
  farmName: string;
  variant: string | null;
  size: number;
  createdAt: string;
  deletedAt: string | null;
}

const EXAMPLE_DATA: AreaManagementTableItem[] =
  [
    {
      "name": "A2",
      "farmName": "Brooklyn",
      "variant": "Durance",
      "deletedAt": null,
      "status": "PRODUCTION",
      "createdAt": "2020-04-18T22:00:00.000+00:00",
      "size": 2.44444
    },
    {
      "name": "A3",
      "farmName": "Brooklyn",
      "variant": null,
      "deletedAt": null,
      "status": "AREA",
      "createdAt": "2020-04-18T22:00:00.000+00:00",
      "size": 3.887263
    },
    {
      "name": "A11",
      "farmName": "Brooklyn",
      "variant": "Butternut",
      "status": "COMPLETE",
      "deletedAt": "2020-09-21T22:00:00.000+00:00",
      "createdAt": "2020-04-18T22:00:00.000+00:00",
      "size": 1.338473663
    },
    {
      "name": "L8-0",
      "farmName": "Langplaas",
      "variant": "Tomato",
      "deletedAt": null,
      "status": "PRODUCTION",
      "createdAt": "2021-05-11T22:00:00.000+00:00",
      "size": 5.443324
    },
    {
      "name": "L23-1",
      "farmName": "Langplaas",
      "variant": null,
      "deletedAt": null,
      "status": "AREA",
      "createdAt": "2021-04-22T22:00:00.000+00:00",
      "size": 0.223442
    },
    {
      "name": "L13-9",
      "farmName": "Langplaas",
      "variant": "Green Pepper",
      "status": "COMPLETE",
      "deletedAt": "2021-09-21T22:00:00.000+00:00",
      "createdAt": "2021-04-18T22:00:00.000+00:00",
      "size": 3.2234
    }
  ];

/**
 * Data source for the AreaManagementTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AreaManagementTableDataSource extends DataSource<AreaManagementTableItem> {
  data: AreaManagementTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
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
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
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

      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;

      }
    });
  }
}

// NOTE mixed string comparison
function compare(a: string, b: string, isAsc: boolean): number {
  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;

  let AInt = parseInt(a, 10);
  let BInt = parseInt(b, 10);
  if (isAsc === true) {
    if (isNaN(AInt) && isNaN(BInt)) {
      let aA = a.replace(reA, "");
      let bA = b.replace(reA, "");
      if (aA === bA) {
        let aN = parseInt(a.replace(reN, ""), 10);
        let bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
      } else {
        return aA > bA ? 1 : -1;
      }

      // NOTE A is not an Int
    } else if (isNaN(AInt)) {

      // NOTE B is not an Int
      return 1;
    } else if (isNaN(BInt)) {
      return -1;
      // NOTE To make alphanumeric sort first return 1 here
    } else {
      return AInt > BInt ? 1 : -1;
    }
  } else {
    if (isNaN(AInt) && isNaN(BInt)) {
      let aA = a.replace(reA, "");
      let bA = b.replace(reA, "");
      if (aA === bA) {
        let aN = parseInt(a.replace(reN, ""), 10);
        let bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN < bN ? 1 : -1;
      } else {
        return aA < bA ? 1 : -1;
      }

      // NOTE A is not an Int
    } else if (isNaN(AInt)) {
      // NOTE To make alphanumeric sort first return -1 here
      return 1;
      // NOTE B is not an Int
    } else if (isNaN(BInt)) {
      //NOTE To make alphanumeric sort first return 1 here
      return -1;
    } else {
      return AInt > BInt ? 1 : -1;
    }
  }

}
