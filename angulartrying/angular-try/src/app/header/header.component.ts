import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        ButtonModule,
        RouterLink
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
