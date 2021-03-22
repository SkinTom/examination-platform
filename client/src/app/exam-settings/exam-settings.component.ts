import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from '../exam';
import { ExamStatus } from '../exam-status.enum';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-settings',
  templateUrl: './exam-settings.component.html',
  styleUrls: ['./exam-settings.component.scss']
})
export class ExamSettingsComponent implements OnInit {

  exam: Exam = this.data.examToUpdate;

  examStatus = [
    ExamStatus.IN_DESIGN,
    ExamStatus.ACTIVE,
    ExamStatus.COMPLETED
  ]

  constructor(private dialogRef: MatDialogRef<ExamSettingsComponent>, @Inject(MAT_DIALOG_DATA) public data: { examToUpdate: Exam }, private examService: ExamService ) {}

  ngOnInit(): void {
  }

  save() {
    this.examService.updateExam(this.exam.id, this.exam).subscribe( data => {
      console.log(data);
    })
  }

  close() {
    this.dialogRef.close();
  }
}

