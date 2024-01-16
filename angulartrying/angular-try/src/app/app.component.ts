import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HttpService} from "./http.service";
import {User} from "./user";
import {Token} from "./token";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpService]
})
export class AppComponent {
  title = 'angular-try';
  user: User = new User("", 0); // данные вводимого пользователя

  receivedToken: Token | undefined; // полученный пользователь

  done: boolean = false;

  messageErr: string | undefined;

  constructor(private httpService: HttpService) {
  }

  register(user: User) {
    this.httpService.postData(user, "/register")
      .subscribe({
        next: (data: any) => {
          this.receivedToken = data;
          this.done = true;
        },
        error: error => {
          this.messageErr = `Ошибка: ${error.status} ${error.statusText}. Сообщение: ${error.message}`;
          this.done = false;
        }
      });
  }

  authenticate(user: User) {
    this.httpService.postData(user, "/authenticate")
      .subscribe({
        next: (data: any) => {
          this.receivedToken = data;
          this.done = true;
          this.messageErr = "авторизация прошла успешно xdd";
        },
        error: error => {
          this.messageErr = `Ошибка xdd: ${error.status} ${error.statusText}. Сообщение: ${error.message}`;
          this.done = false;
        }
      });
  }

  getContent() {
    if (this.receivedToken) {
      this.httpService.getDataWithToken(this.receivedToken)
        .subscribe({
          next: (data: any) => {
            this.done = true;
            this.messageErr="okkk";
          },
          error: error => {
            console.log(error);
            this.messageErr = `Ошибка zalupi: ${error.status} ${error.statusText}. Сообщение: ${error.message}`;
            this.done = false;
          }
        });

    } else {
      this.messageErr = "error";
    }
  }


}
