import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "./token";
import {AuthService} from "./auth.service";
import {ShotResponse} from "./shot-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShotService {
  private readonly baseUrl = `http://localhost:8080/api/demo-controller`;
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);


  addShot(x: number, y: number, r: number):Observable<ShotResponse> {
    const formData = {
      x: x,
      y: y,
      r: r
    };
    const jwtToken = this.authService.authToken;

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${jwtToken}`);
    console.log("kkokokok")

    return this.httpClient
      .post<ShotResponse>(`${this.baseUrl}/addShot`, JSON.stringify(formData),{ headers: headers });
  }

  clearShots() {
    const jwtToken = this.authService.authToken;

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${jwtToken}`);
    console.log("kkokokok")

    return this.httpClient
      .delete<ShotResponse>(`${this.baseUrl}`,{ headers: headers });
  }

  getShots(): ShotResponse[] {
    return JSON.parse(sessionStorage.getItem('shots') ?? '[]');
  }
}
