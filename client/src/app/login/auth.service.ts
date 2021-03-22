import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ignoreElements, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  SESSION_TOKEN = 'sessionToken';
  SESSION_LOGIN_STATUS = 'loginStatus';

  public username: string;
  public password: string;
  public loginStatus = new BehaviorSubject<boolean>(sessionStorage.getItem(this.SESSION_LOGIN_STATUS) == '1');
  public login = new BehaviorSubject<string>(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME));

  constructor(private http: HttpClient) { }

  authenticationService(username: string, password: string) {
    return this.http.get(`${environment.baseUrl}api/v1/basicauth`,
    { headers: { authorization: this.createBasicAuthToken(username, password) }}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.login.next(username);
      this.registerSuccessfulLogin(username, password);
      let basicAuthToken = this.createBasicAuthToken(username, password);
      sessionStorage.setItem(this.SESSION_TOKEN, basicAuthToken);
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password); 
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(this.SESSION_LOGIN_STATUS, "1");
    this.loginStatus.next(true);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.SESSION_LOGIN_STATUS);
    sessionStorage.removeItem(this.SESSION_TOKEN);
    this.loginStatus.next(false); 
    this.login.next(null);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let loginCookie = sessionStorage.getItem(this.SESSION_LOGIN_STATUS);
    if(loginCookie == "1") return true;
    return false;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if(user === null) return '';
    return user;
  }
}
