import {Component} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {TreeSelectModule} from "primeng/treeselect";

@Component({
    selector: 'app-shot-form',
    standalone: true,
    imports: [
        SliderModule,
        FormsModule,
        TreeSelectModule
    ],
    templateUrl: './shot-form.component.html',
    styleUrl: './shot-form.component.css'
})
export class ShotFormComponent {
    value!: number;
}
