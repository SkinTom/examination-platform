import { AfterViewInit, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { Answer } from '../answer';
import { Exam } from '../exam';
import { ExamService } from '../exam.service';
import { Question } from '../question';
import { Result } from '../result';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-exam-preview',
  templateUrl: './exam-preview.component.html',
  styleUrls: ['./exam-preview.component.scss']
})
export class ExamPreviewComponent implements OnInit, AfterViewInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  showSpinner = false;
  submitted = false;
  points = 0;
  maxPoints: number;
  correctAnswers = 0;
  incorrectAnswers = 0;
  idExam: number;
  resultId: number;
  exam = new Exam();
  correctExam = new Exam();
  time: number;
  examResult: Result = new Result();

  constructor(public router: Router, private route: ActivatedRoute, private examService: ExamService, private resultService: ResultService) {}

  ngOnInit(): void {
    // this.showSpinner = true;
    this.idExam = history.state.examId;
    this.resultId = history.state.resultId;

    console.log(this.resultId);

    this.examService.getExamById(this.idExam).subscribe( data => {
      this.correctExam = data;
    })

    this.examService.getExamById(this.idExam).subscribe( data => {
      this.clearExam(data);
      this.exam = data;

      if(this.exam.questionCollection) {
        this.exam.questions = this.chooseRandomQuestion(this.exam);
        console.log(this.exam.questions);
      }

      if(this.exam.randomQuestion) {
        this.shuffle(this.exam.questions);
      }

      if(this.exam.randomAnswers) {
        this.shuffleAnswers(this.exam.questions);
      }
    });
  }

  ngAfterViewInit(): void {
    this.calculateMaxPoints();  

    if(this.exam.time !== 0 && this.exam.time !== null){
      this.countdown.begin();
    }
  }

  shuffleAnswers(array: Array<Question>): void {
    if(this.exam.randomAnswers) {
      array.forEach(a => {
        a.answers.sort(() => Math.random() - 0.5);
      })
    }
  }

  chooseRandomQuestion(exam: Exam): Array<Question> {
    let array = [];
    let numberArray = [];
    let size = exam.questions.length;
    let index = exam.numberQuestionCollection;
    let random: number;

    while(0 != index) {
      random = Math.floor(Math.random() * size);
      
      if(!numberArray.includes(random)) {
        numberArray.push(random);
        index -= 1;
      }
    }

    numberArray.forEach( num => {
          array.push(exam.questions[num]);
    })

    return array;
  }

  shuffle(array: Array<Question>): void {
    let i = array.length;
    let temp: Question;
    let random: number;

    while(0 !== i) {
      random = Math.floor(Math.random() * i);
      i -= 1;
      temp = array[i];
      array[i] = array[random];
      array[random] = temp;
    }
  }

  calculateMaxPoints(): void {
    this.maxPoints = 0;

    this.exam.questions.forEach( question => {
      this.maxPoints += question.points;
    });
  }

  onTimerFinished(e: Event) {
    if(e["action"] == "done") {
      this.time = e["status"];

      if(this.router.url === '/exams/active/exam') {
        this.submitExam();
      } else {
        this.submitPreviewExam();
      }
    }
  }

  clearExam(exam: Exam): void {
    exam.questions.map((quesiton) => {
      quesiton.answers.map((answer) => {
        if(answer.correct === true) {
          answer.correct = false;
        }
      })
    })
  }

  backToExamView() {
    this.router.navigate(['exams', this.idExam]);
  }

  getAnswer(answerId: number): Answer {

    let foundAnswer = null;

    this.correctExam.questions.forEach((question) => {
      question.answers.forEach((answer) => {

        if(answer.id === answerId) {
          foundAnswer = answer;
        }
      })
    })

    return foundAnswer;
  }

  countExam() {
    let questionIsCorrect: boolean;

    if(this.exam.enableTime === true) {
      this.time = this.countdown.left;
    }
  
    this.exam.questions.forEach((question) => {
      questionIsCorrect = true;

      question.answers.forEach((answer) => {
        if(answer.correct !== this.getAnswer(answer.id).correct) {
          questionIsCorrect = false;
        } 
      })

      if(questionIsCorrect) {
        this.points += question.points;
        this.correctAnswers++;
      }
    })

    this.incorrectAnswers = this.exam.questions.length - this.correctAnswers;
  }

  submitExam() {
    this.countExam();
    this.examResult.id = this.resultId;
    this.examResult.completed = true;
    this.examResult.points = this.points;
    this.examResult.maxPoints = this.maxPoints;
    this.examResult.percent = Math.floor((this.points / this.maxPoints) * 100);
    this.examResult.correctAnswers = this.correctAnswers;
    this.examResult.incorrectAnswers = this.incorrectAnswers;
    
    this.resultService.updateResult(this.examResult).subscribe(data => {
      console.log(this.examResult);
    })

    this.submitted = true;
  }

  submitPreviewExam(): void {
    this.countExam();
    this.submitted = true;
  }
}
