import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamsViewComponent } from './exams-view/exams-view.component';
import { GroupsViewComponent } from './groups-view/groups-view.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthQuardService } from './auth-quard.service';
import { ExamPreviewComponent } from './exam-preview/exam-preview.component';
import { ResultViewComponent } from './result-view/result-view.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { 
    path: "exams", 
    component: ExamsViewComponent,
    canActivate: [AuthQuardService],
  },
  { 
    path: "exams/:id", 
    component: ExamViewComponent,
    canActivate: [AuthQuardService]  
  },
  { 
    path: "exams/:id/results", 
    component: ResultsViewComponent,
    canActivate: [AuthQuardService]  
  },
  { 
    path: "exams/preview/exam", 
    component: ExamPreviewComponent,
    canActivate: [AuthQuardService] 
  },
  { 
    path: "exams/active/exam", 
    component: ExamPreviewComponent,
    canActivate: [AuthQuardService] 
  },
  {
    path: "exams/results/exam",
    component: ResultViewComponent,
    canActivate: [AuthQuardService]
  },
  {
    path: "groups",
    component: GroupsViewComponent,
    canActivate: [AuthQuardService]
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthQuardService]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
