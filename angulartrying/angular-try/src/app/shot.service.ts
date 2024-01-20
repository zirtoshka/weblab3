import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "./token";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ShotService {
  private readonly baseUrl = `http://localhost:8080/api/demo-controller`;
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);


  addShot(x: number, y: number, r: number) {
    const formData = {
      x: x,
      y: y,
      r: r
    };
    const jwtToken = this.authService.authToken;

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ${jwtToken}');


    this.httpClient
      .post(`${this.baseUrl}/addShot`, JSON.stringify(formData),{ headers: headers })
      .subscribe((data) => console.log(data))

  }
}
