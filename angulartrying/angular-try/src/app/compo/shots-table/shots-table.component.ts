import {Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-shots-table',
  standalone: true,
  imports: [
    MatTable
  ],
  templateUrl: './shots-table.component.html',
  styleUrl: './shots-table.component.css'
})
export class ShotsTableComponent {
  @ViewChild(MatTable) table!: MatTable<Number>;

  dataSource: Number[] = [1,2];
  displayedColumns = ['x', 'y', 'r', 'currentTime', 'executeTime', 'hit'];


}
