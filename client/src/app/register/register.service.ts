import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = environment.baseUrl + 'api/v1/register';

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.url}`, user);
  } 
}
