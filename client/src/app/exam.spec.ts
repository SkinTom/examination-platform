import { Exam } from './exam';
import { ExamService } from './exam.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

describe('Service ExamService', () => {
  let examService: ExamService;
  let httpMock: HttpTestingController;

  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ExamService]
  })

  examService = TestBed.inject(ExamService);
  httpMock = TestBed.inject(HttpTestingController);

  it('should successfully take exam', waitForAsync(() => {
    const examData: Exam[] = [{
      "id": 1, 
      "name": "Przykładowy egzamin", 
      "enableTime": false, 
      "time": 0, 
      "status": "Aktywny",
      "randomQuestion": false,
      "randomAnswers": false,
      "questionCollection": false,
      "numberQuestionCollection": 0,
      "questions": []
    }];

    examService.getExamList().subscribe(res => expect(res).toEqual(examData));
    let examRequest = httpMock.expectOne(environment.baseUrl + 'api/v1/exams');
    examRequest.flush(examData);
  }));

  it('return error, if the request is unsuccessful', waitForAsync( () => {
    const errorType = 'CANNOT_LOAD_PRODUCTS';
    examService.getExamList().subscribe(() =>{}, 
      errorResponse => expect(errorResponse.error.type).toEqual(errorType));
    
    let examRequest = httpMock.expectOne(environment.baseUrl + 'api/v1/exams');
    examRequest.error(new ErrorEvent(errorType));
  }));

  afterEach(() => httpMock.verify());
});
