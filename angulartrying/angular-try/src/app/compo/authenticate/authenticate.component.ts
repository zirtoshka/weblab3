import {Component, inject} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule

  ],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
    private userService = inject(AuthService)

    onSubmit(form: NgForm) {
        const {username, password} = form.value
        this.userService.login(username, password)
    }
}
