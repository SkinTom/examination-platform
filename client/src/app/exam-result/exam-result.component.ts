import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  @Input() maxPoints: number;
  @Input() scoredPoints: number;
  @Input() time: number;
  @Input() name: string;
  @Input() correctAnswers: number;
  @Input() incorrectAnswers: number;

  percentage: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.percentage = Math.floor((this.scoredPoints / this.maxPoints) * 100);
  }

  end(): void {
    this.router.navigate(['exams']);
  }
}
