import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam } from './exam';
import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = environment.baseUrl + 'api/v1/results';

  constructor(private httpClient: HttpClient) { }

  getResultList(): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.baseUrl}`);
  }

  getResultListByExam(examId: number): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.baseUrl}/exam/${examId}`);
  }

  getResultById(resultId: number): Observable<Result> {
    return this.httpClient.get<Result>(`${this.baseUrl}/${resultId}`);
  }

  createResult(result: Result): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, result);
  } 

  createResultByUsername(username: string, examId: number): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/${username}/${examId}`, null);
  }

  updateResult(result: Result): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}`, result);
  }
}
