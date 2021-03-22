import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { __param } from 'tslib';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl + 'api/v1';

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${username}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users/all`);
  }

  shareExam(examId: number, username: string): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/share?examId=${examId}&username=${username}`, null);
  }

  updateAccount(firstName: string, lastName: string, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/account?firstName=${firstName}&lastName=${lastName}`, user);
  }

  updatePassword(user: User, currentPassword: string, newPassword: string): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/users/password?currentPassword=${currentPassword}&newPassword=${newPassword}`, user);
  }
}
