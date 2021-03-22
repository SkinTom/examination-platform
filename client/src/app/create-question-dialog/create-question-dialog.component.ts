import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../exam.service';
import { Question } from '../question';
import { UpdateQuestionDialogComponent } from '../update-question-dialog/update-question-dialog.component';

@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.scss']
})
export class CreateQuestionDialogComponent implements OnInit {

  questionObj: Question = new Question();
  questionForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateQuestionDialogComponent>, private examService: ExamService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: { idExam: number }) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.questionForm = this.fb.group({
      question: ['', { validators: [Validators.required]}],
      points: ['', { validators: [Validators.required]}],
      answers: this.fb.array([
        this.fb.group({
          answer: this.fb.control('', { validators: [Validators.required]}),
          correct: this.fb.control('')
        }),
        this.fb.group({
          answer: this.fb.control('', { validators: [Validators.required]}),
          correct: this.fb.control('')
        })
      ])
    });
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  get question(): FormControl {
    return this.questionForm.get('question') as FormControl;
  }

  get points(): FormControl {
    return this.questionForm.get('points') as FormControl;
  }

  close(): void {
    this.dialogRef.close();
  }

  addAnswer() {
    this.answers.push(new FormGroup({
      answer: new FormControl('', { validators: [Validators.required]}),
      correct: new FormControl()
    }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  addQuestion() {
    console.log(this.questionForm.value);

    this.questionObj.question = this.question.value;
    this.questionObj.points = this.points.value;
    this.questionObj.answers = this.answers.value;

    this.examService.createQuestion(this.questionObj, this.data.idExam).subscribe( data => {
      console.log(data);
    },
    error => console.log(error));
    this.close();
  }
}
