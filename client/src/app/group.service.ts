import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserGroup } from './user-group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = environment.baseUrl + 'api/v1/groups';

  constructor(private httpClient: HttpClient) { }

  getGroupList(): Observable<UserGroup[]> {
    return this.httpClient.get<UserGroup[]>(`${this.baseUrl}`);
  }

  getGroupById(id: number): Observable<UserGroup> {
    return this.httpClient.get<UserGroup>(`${this.baseUrl}/${id}`);
  }

  createGroup(group: UserGroup): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, group);
  }

  deleteGroup(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  } 

  addMember(groupId: number, username: string): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/members?groupId=${groupId}&username=${username}`, null);
  }

  deleteMember(userId: number, groupId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/members/${userId}?groupId=${groupId}`);
  }
}
