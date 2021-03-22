import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamService } from '../exam.service';
import { Question } from '../question';

@Component({
  selector: 'app-update-question-dialog',
  templateUrl: './update-question-dialog.component.html',
  styleUrls: ['./update-question-dialog.component.scss']
})
export class UpdateQuestionDialogComponent implements OnInit {

  questionObj: Question = new Question();
  questionForm: FormGroup;
  types: string[] = ['single choice', 'multiple choice'];
  answersToDelete: number[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { questionToUpdate: Question }, private examService: ExamService, private dialogRef: MatDialogRef<UpdateQuestionDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionObj = this.data.questionToUpdate;
    this.formInitializer();
    this.setQuestionValue();
  }

  formInitializer() {
    this.questionForm = this.fb.group({
      question: ['', { validators: [Validators.required]}],
      points: ['', { validators: [Validators.required]}],
      answers: this.fb.array([])
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

  setQuestionValue() {
    this.questionForm.patchValue ({
      question: this.data.questionToUpdate.question,
      points: this.data.questionToUpdate.points,
      answers: this.data.questionToUpdate.answers.forEach(x => {
        this.answers.push(new FormGroup({
          answer: new FormControl(x.answer),
          correct: new FormControl(x.correct),
          id: new FormControl(x.id)
        }));
      })
    });
  }

  updateQuestion() {
    console.log(this.questionForm.value);

    this.answersToDelete.forEach(id => {
      this.examService.deleteAnswer(id).subscribe(data => {
        console.log(data);
      })
    });

    this.questionObj.question = this.question.value;
    this.questionObj.points = this.points.value;
    this.questionObj.answers = this.answers.value;

    this.examService.updateQuestion(this.questionObj.id, this.questionObj).subscribe( data => {
      console.log(data);
    },
    error => console.log(error));
  }

  addAnswer() {
    this.answers.push(new FormGroup({
      answer: new FormControl('', { validators: [Validators.required]}),
      correct: new FormControl()
    }));
  }

  removeAnswer(index: number) {
    let id = this.answers.at(index).get('id');
    if(id != null) {
      this.answersToDelete.push(id.value);
    }  
    this.answers.removeAt(index);
  }

  close(): void {
    this.dialogRef.close();
  }



}
