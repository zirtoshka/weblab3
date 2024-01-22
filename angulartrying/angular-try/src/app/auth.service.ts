import {inject, Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {Router} from '@angular/router'
import {Token} from "./token";
import {deleteCookie, getCookie, setCookie} from "./cookie-utils";
import axios from "axios";
import {catchError, throwError} from "rxjs";
import {MessageService} from "primeng/api";


const TOKEN_PATH = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `http://localhost:8080/api/auth`;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private messageService = inject(MessageService)


  get username(): string | null {
    return sessionStorage.getItem('username');
  }

  set username(username: string | null | undefined) {
    if (username == null) {
      sessionStorage.removeItem('username');
    } else {
      sessionStorage.setItem('username', username);
    }
  }

  get isLoggedIn(): boolean {
    return this.authToken != null;
  }

  get authToken(): string | null {
    return getCookie(TOKEN_PATH);
  }

  set authToken(token: string | null) {
    if (token == null) {
      deleteCookie(TOKEN_PATH);
      sessionStorage.removeItem('shots');
      sessionStorage.removeItem('r');
    } else {
      setCookie(TOKEN_PATH, token);
    }
  }

  private auth(name: string, token: string) {
    this.authToken = token;
    this.username = name;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    this.httpClient.get(`http://localhost:8080/api/demo-controller/getShots`, {
      headers: headers
    }).subscribe(data => {
      sessionStorage.setItem('shots', JSON.stringify(data));
      this.router.navigate(['home']);
    })


  }

  private deezNuts(service: AuthService) {
    const handleError = (error: HttpErrorResponse) => {
      if(error.status==409){
      service.showError(error.error.error)}
      else {
      service.showError(error.message)}
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    return handleError
  }




  postData(username: string, password: string, action: string) {
      return this.httpClient
        .post<Token>(`${this.baseUrl}/${action}`, {"name": username, password}).pipe(catchError(this.deezNuts(this)))
        .subscribe((data) => {
          this.auth(username, data.token)
        });

  }

  login(username: string, password: string) {
    return this.postData(username, password, "authenticate");
  }

  register(username: string, password: string) {
    return this.postData(username, password, "register");
  }

  logout() {
    this.authToken = null;
    this.username = undefined;
    this.router.navigate(['authenticate']);
  }


  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    })
  }
}
