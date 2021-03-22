import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam } from './exam';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseUrl = environment.baseUrl + 'api/v1/exams';

  constructor(private httpClient: HttpClient) { }

  getExamList(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${this.baseUrl}`);
  }

  getExamById(id: number): Observable<Exam> {
    return this.httpClient.get<Exam>(`${this.baseUrl}/${id}`);
  }

  createExam(exam: Exam): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, exam);
    }

  updateExam(id: number, exam: Exam): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/${id}`, exam);
  }

  deleteExam(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  } 

  createQuestion(question: Question, id: number): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/${id}/${'questions'}`, question); 
  }

  updateQuestion(id: number, question: Question): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${'questions'}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${'questions'}/${id}`);
  }

  deleteAnswer(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${'answers'}/${id}`);
  }
}
