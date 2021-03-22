import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateExamDialogComponent } from '../create-exam-dialog/create-exam-dialog.component';
import { Exam } from '../exam';
import { ExamStatus } from '../exam-status.enum';
import { ExamService } from '../exam.service';
import { Result } from '../result';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-exams-view',
  templateUrl: './exams-view.component.html',
  styleUrls: ['./exams-view.component.scss']
})
export class ExamsViewComponent implements OnInit {

  displayedColumns: string[] = ['num', 'name', 'time', 'status'];
  dataSource = new MatTableDataSource<Exam>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumnsSharedExam: string[] = ['num', 'name', 'status', 'option'];
  dataSourceSharedExam = new MatTableDataSource<Result>();

  inDesign = ExamStatus.IN_DESIGN;
  active = ExamStatus.ACTIVE;

  showSpinner = false;

  constructor(private examService: ExamService, private resultService: ResultService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.examService.getExamList().subscribe(data => {
      this.dataSource.data = data;
    });

    this.resultService.getResultList().subscribe(data => {
      this.dataSourceSharedExam.data = data;
    })

    // this.resultService.getSharedExamList().subscribe(data => {
    //   this.dataSourceSharedExam.data = data;
    // })
  }

  examView(id: number) {
    this.router.navigate(['exams', id]);
  }

  createExam() {
    let dialogRef = this.matDialog.open(CreateExamDialogComponent, {
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteExam(id: number) {
    this.examService.deleteExam(id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  start(examId: number, resultId: number): void {
    this.router.navigateByUrl('exams/active/exam', {state: {examId: examId, resultId: resultId}});
  }

  seeResult(resultId: number): void {
    this.router.navigateByUrl('exams/results/exam', {state: {resultId: resultId}});
  }

  examResults(examId: number): void {
    this.router.navigate(['exams', examId, 'results']);
  }
}
