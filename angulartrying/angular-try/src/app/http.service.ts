import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {Token} from "./token";

@Injectable()
export class HttpService {


  constructor(private http: HttpClient) {
  }

  postData(user: User, action: string) {

    const body = {name: user.name, password: user.password};
    return this.http.post("http://localhost:8080/api/auth" + action, body);
  }

  getDataWithToken(token: Token) {
    console.log('Bearer ' + token.token);
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.token
    });
    console.log(headers);
    return this.http.get('http://localhost:8080/api/demo-controller', {headers});
  }

}
