import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateQuestionDialogComponent } from '../create-question-dialog/create-question-dialog.component';
import { DeleteQuestionModalComponent } from '../delete-question-modal/delete-question-modal.component';
import { Exam } from '../exam';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';
import { ExamService } from '../exam.service';
import { Question } from '../question';
import { ShareExamDialogComponent } from '../share-exam-dialog/share-exam-dialog.component';
import { UpdateQuestionDialogComponent } from '../update-question-dialog/update-question-dialog.component';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.scss']
})
export class ExamViewComponent implements OnInit {

  id: number;
  points: number;
  exam: Exam = new Exam();

  constructor(private examService: ExamService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.examService.getExamById(this.id).subscribe( data => {
      this.exam = data;
    });
  }
  
  sumPoints(): number {
    this.points = 0;

    this.exam.questions.forEach( question => {
      this.points += question.points;
    });

    return this.points;
  }

  addQuestion(): void {
    let dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      data: { idExam: this.id },
      disableClose: true,
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editQuestion(question: Question): void {
    let dialogRef = this.dialog.open(UpdateQuestionDialogComponent, {
      data: { questionToUpdate: question },
      disableClose: true,
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteQuestion(questionId: number): void {
    let dialogRef = this.dialog.open(DeleteQuestionModalComponent, {
      data: { questionId: questionId },
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  examPreview(id: number) {
    this.router.navigateByUrl('exams/preview/exam', {state: {examId: id}});
  }

  examSettings(id: number) {
    let dialogRef = this.dialog.open(ExamSettingsComponent, {
      data: { examToUpdate: this.exam },
      disableClose: true,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  examShare() {
    let dialogRef = this.dialog.open(ShareExamDialogComponent, {
      data: { exam: this.exam },
      disableClose: true,
      width: '600px',
    })
  }
}
