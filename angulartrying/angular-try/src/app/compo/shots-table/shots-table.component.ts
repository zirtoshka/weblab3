import {Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ShotResponse} from "../../shot-response";
import {ShotService} from "../../shot.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-shots-table',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCell,
    MatCell
  ],
  templateUrl: './shots-table.component.html',
  styleUrl: './shots-table.component.css'
})
export class ShotsTableComponent {
  @ViewChild(MatTable) table!: MatTable<ShotService>;
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(private service: ShotService) {
    console.log('deez')
  }

  refresh() {
    this.dataSource = this.service.getShots().reverse()
    this.table.renderRows()
  }

  dataSource : ShotResponse[] = [];
  displayColumns : string[] = [];

  ngOnInit() {
    this.displayColumns = ['x', 'y', 'r', 'createTime', 'kill'];
    this.dataSource = this.service.getShots().reverse()
  }
}
