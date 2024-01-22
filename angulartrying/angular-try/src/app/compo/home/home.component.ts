import {Component, inject} from '@angular/core';
import {GraphComponent} from "../graph/graph.component";
import {ShotFormComponent} from "../shot-form/shot-form.component";
import {ShotsTableComponent} from "../shots-table/shots-table.component";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GraphComponent,
    ShotFormComponent,
    ShotsTableComponent,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
