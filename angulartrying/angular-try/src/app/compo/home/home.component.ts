import { Component } from '@angular/core';
import {GraphComponent} from "../graph/graph.component";
import {ShotFormComponent} from "../shot-form/shot-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GraphComponent,
    ShotFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
