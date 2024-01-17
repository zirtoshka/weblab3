import {Component, inject} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {MessageService} from "primeng/api";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        HeaderComponent,
        ReactiveFormsModule,
        FormsModule,
        RouterLink,

    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    private userService = inject(AuthService)
    private messageService = inject(MessageService)

    private validationFailed!: boolean

    onSubmit(form: NgForm) {
        const {username, password, passwordConfirmation} = form.value
        console.log(username, password);
        console.log("jopa")
        debugger
        this.validationFailed = false
        if (username == null || username.length < 6 || username.length > 20)
            this.showError('Username must be between 6 and 20 characters')
        if (username != null && !/^[a-z0-9_]+$/i.test(username))
            this.showError('Username must contain only letters, numbers and underscores')
        if (password != passwordConfirmation)
            this.showError('Passwords don\'t match')
        if (password == null || password.length < 8 || password.length > 32)
            this.showError('Password must be between 8 and 32 characters')
        if (this.validationFailed) return

        this.userService.register(username, password)
    }

    private showError(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        })
        this.validationFailed = true
    }
}
