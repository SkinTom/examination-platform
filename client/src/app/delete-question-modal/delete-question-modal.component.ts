import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-delete-question-modal',
  templateUrl: './delete-question-modal.component.html',
  styleUrls: ['./delete-question-modal.component.scss']
})
export class DeleteQuestionModalComponent implements OnInit {

  constructor(private examService: ExamService, private dialogRef: MatDialogRef<DeleteQuestionModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { questionId: number }) { }

  ngOnInit(): void {
  }

  delete() {
    this.examService.deleteQuestion(this.data.questionId).subscribe( data => {
      console.log(data);
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
