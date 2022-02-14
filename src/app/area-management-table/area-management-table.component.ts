import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AreaManagementTableDataSource, AreaManagementTableItem } from './area-management-table-datasource';
import _, { filter, isSet, values } from 'lodash';

@Component({
  selector: 'app-area-management-table',
  templateUrl: './area-management-table.component.html',
  styleUrls: ['./area-management-table.component.css']
})
export class AreaManagementTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AreaManagementTableItem>;
  dataSource: AreaManagementTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['status', 'name', 'farmName', 'variant', 'size', 'createdAt', 'deletedAt'];

  // data: AreaManagementTableItem[] = [];

  constructor() {
    this.dataSource = new AreaManagementTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  farmFilterChange(filtervalue: any) {
    const filterString = filtervalue.value;
    const data = this.dataSource.data;
    const filteredData = _.filter(data, function (o) {
      return o.farmName === filterString
    });
    this.table.dataSource = filteredData;
    // TODO CONVERT ENTIRE OBJECT
  }

  findColumns(val: any) {
    // TODO
    // let testData = this.table.dataSource;
    const searchVal = val.target.value;
    const data = this.dataSource.data;
    const filteredData: any | null = _.filter(data, function (o) {
      // console.log(searchVal);
      console.log(o.variant);
      if (o.variant!.search(searchVal)) {
        return o.variant === searchVal;
        // this.table.dataSource = searchVal;
        // return o.varient;
      } else {
        return;
      }
    });
    this.table.dataSource = filteredData;
  }

  toggleSlide(value: any) {
    if (value.checked == true) {
      const data = this.dataSource.data;
      const filteredData = _.filter(data, function (o) {
        return o.deletedAt !== null
      });
      // TODO CONVERT ENTIRE OBJECT
      this.table.dataSource = filteredData;
    } else {
      this.table.dataSource = this.dataSource;
    }
  }
}