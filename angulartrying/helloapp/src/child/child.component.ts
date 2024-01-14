import {Component, Input} from "@angular/core";

@Component({
    selector: 'child-comp',
    standalone: true,
    templateUrl: "child.component.html",
    styleUrls: ["child.component.css"]
})
export class ChildComponent {
    @Input() userName = "";
    _userAge = 0;
    @Input()
    set userAge(age: number) {
        if(age<0)
            this._userAge=0;
        else if(age>100)
            this._userAge=100;
        else
            this._userAge = age;
    }
    get userAge() { return this._userAge; }
}

