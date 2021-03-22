import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Exam } from '../exam';
import { ExamService } from '../exam.service';
import { Result } from '../result';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})
export class ResultsViewComponent implements OnInit {

  examId: number;
  dataSource = new MatTableDataSource<Result>();
  exam: Exam;

  displayedColumns: string[] = ['num', 'firstName', 'lastName', 'points', 'percent', 'correct', 'incorrect', 'status'];

  constructor(private route: ActivatedRoute, private resultService: ResultService, private examService: ExamService) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];

    this.examService.getExamById(this.examId).subscribe(data => {
      this.exam = data;
    })

    this.resultService.getResultListByExam(this.examId).subscribe(data => {
      this.dataSource.data = data;
    })
  }

}
