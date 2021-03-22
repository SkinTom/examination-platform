import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Exam } from '../exam';
import { ExamStatus } from '../exam-status.enum';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-create-exam-dialog',
  templateUrl: './create-exam-dialog.component.html',
  styleUrls: ['./create-exam-dialog.component.scss']
})

export class CreateExamDialogComponent implements OnInit {

  exam: Exam = new Exam();

  constructor(public dialogRef: MatDialogRef<CreateExamDialogComponent>, private examService: ExamService) { }

  ngOnInit(): void {
  }

  saveExam() {
    this.exam.status = ExamStatus.IN_DESIGN;
    this.exam.enableTime = false;
    this.exam.time = 0;
    this.exam.randomQuestion = false;
    this.exam.randomAnswers = false;
    this.exam.questionCollection = false;
    this.exam.numberQuestionCollection = 0;
    this.exam.questions = [];

    this.examService.createExam(this.exam).subscribe( data => {
      console.log(data);
    },
    error => console.log(error));
  }

  close(): void {
    this.dialogRef.close();
  }

}
