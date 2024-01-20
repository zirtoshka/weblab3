import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {ToastModule} from "primeng/toast";
import {SliderModule} from "primeng/slider";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule, HeaderComponent, ToastModule, SliderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {


}
