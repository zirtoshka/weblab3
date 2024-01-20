import {AfterViewInit, Component, inject} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {TreeSelectModule} from "primeng/treeselect";
import {PaginatorModule} from "primeng/paginator";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ButtonModule} from "primeng/button";
import {FormBuilder} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MessageService} from "primeng/api";
import {ShotService} from "../../shot.service";
import {GraphComponent} from "../graph/graph.component";


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
    ButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './shot-form.component.html',
  styleUrl: './shot-form.component.css'
})
export class ShotFormComponent {


  shotForm: FormGroup;
  displayValueX = 0;
  displayValueR = 0;
  private shotService = inject(ShotService);
  // private graphComponent = inject(GraphComponent);


  constructor(private formBuilder: FormBuilder) {

    this.shotForm = formBuilder.group({

      "x": ["0", [Validators.required,
        Validators.min(-5),
        Validators.max(3),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      "y": ["0", [Validators.required,
        Validators.min(-5),
        Validators.max(3),
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]], //'\\d+(\\.|,\\d+)?'
      "r": ["0", [Validators.required,
        Validators.min(0),
        Validators.max(3),
        Validators.pattern('-?\\d+(\\.\\d+)?')]]
    });
  }

  submit() {
    console.log(this.shotForm);
    // console.log(Number(this.shotForm.value.x.replace(",","."))+2);
    // console.log(Number(this.shotForm.value.x)+2);
    this.shotService.addShot(Number(this.shotForm.value.x), Number(this.shotForm.value.y), Number(this.shotForm.value.r));

  }

  onSliderChangeX(event: any) {
    this.displayValueX = event.value;
  }

  onSliderChangeR(event: any) {
    this.displayValueR = event.value;
    // this.graphComponent.refresh(3);
  }


}
