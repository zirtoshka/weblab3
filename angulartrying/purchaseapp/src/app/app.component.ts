import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";

class Item {
    purchase: string;
    done: boolean;
    price: number;

    constructor(purchase: string, price: number) {
        this.purchase=purchase;
        this.price=price;
        this.done=false;
    }
}
@Component({
    selector: "purchase-app",
    standalone: true,
    imports: [FormsModule],
    templateUrl:"app.component.html"
})
export class AppComponent{
    text: string="";
    price: number=0;
    items: Item[]=[
        {purchase: "Gucci", done:false, price: 1234.5},
        {purchase:"Chanel", done:false, price:1903942.34},
        {purchase:"Mercedes", done:true, price:342342342.322}
    ];
    addItem(text:string, price: number) {
        if(!text||text.trim()==""||!price) return;
        this.items.push(new Item(text, price));
    }
}