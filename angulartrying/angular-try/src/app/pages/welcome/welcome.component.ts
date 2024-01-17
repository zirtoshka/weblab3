import {Component, inject} from '@angular/core';
import {AuthService} from "../../auth.service";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ ButtonModule,
    RouterLink,
    RippleModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  protected userService = inject(AuthService)

}
