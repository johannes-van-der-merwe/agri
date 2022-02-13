import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { AreaManagementTableDataSource, AreaManagementTableItem } from './area-management-table-datasource';

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

  constructor() {
    this.dataSource = new AreaManagementTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
