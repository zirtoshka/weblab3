import {Component} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {FormsModule, NgForm} from "@angular/forms";
import {TreeSelectModule} from "primeng/treeselect";
import {PaginatorModule} from "primeng/paginator";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ButtonModule} from "primeng/button";

@Component({
    selector: 'app-shot-form',
    standalone: true,
    imports: [
        SliderModule,
        FormsModule,
        TreeSelectModule,
        PaginatorModule,
        InputGroupAddonModule,
        InputGroupModule,
        ButtonModule
    ],
    templateUrl: './shot-form.component.html',
    styleUrl: './shot-form.component.css'
})
export class ShotFormComponent {
    valueX=0;
    valueR=0;
    valueY = 0;

    onSubmit(form: NgForm) {
        const {x, y, r} = form.value;
        console.log(x, y,r );
        // xList.forEach((x: any) => rList.forEach((r: any) => this.shoot(x, y, r)))
    }

    isFormValid() {
        // const {x, y, r} = form.value;
        // console.log(x)
        return true;
       return (this.valueX>=-5 && this.valueX<=3) &&(this.valueY>=-5 && this.valueY<=3) &&(this.valueR>=-5 && this.valueR<=3) ;
    }


}
