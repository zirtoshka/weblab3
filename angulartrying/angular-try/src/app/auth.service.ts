import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import {Token} from "./token";




@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = `http://localhost:8080/api/auth`;
    private httpClient = inject(HttpClient);
    private router = inject(Router);

    get username(): string | null {
        return sessionStorage.getItem('username');
    }

    set username(username: string | null | undefined) {
        if (username == null) {
            sessionStorage.removeItem('username');
        }
        else {
            sessionStorage.setItem('username', username);
        }
    }

    get isLoggedIn(): boolean {
        return this.authToken != null;
    }

    get authToken(): string | null {
        return sessionStorage.getItem('token')
    }

    set authToken(token: string | null | undefined) {
        if (token == null) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('shots');
          sessionStorage.removeItem('r');
        }

        else sessionStorage.setItem('token', token)
    }

    private auth(name: string, token: string) {
        this.authToken = token
        this.username = name
        this.router.navigate(['home'])
    }

    postData(username: string, password: string, action: string){
        return this.httpClient
            .post<Token>(`${this.baseUrl}/${action}`, {"name": username.valueOf(), password})
            .subscribe((data) => this.auth(username, data.token))

    }
    login(username: string, password: string) {
        return this.postData(username,password,"authenticate");
    }

    register(username: string, password: string) {
        return this.postData(username, password, "register");
    }

    logout() {
        this.authToken = null
        this.username = undefined
        this.router.navigate(['authenticate'])
    }
}
