import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamsViewComponent } from './exams-view/exams-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GroupsViewComponent } from './groups-view/groups-view.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CreateExamDialogComponent } from './create-exam-dialog/create-exam-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateQuestionDialogComponent } from './create-question-dialog/create-question-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteQuestionModalComponent } from './delete-question-modal/delete-question-modal.component';
import { UpdateQuestionDialogComponent } from './update-question-dialog/update-question-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExamPreviewComponent } from './exam-preview/exam-preview.component';
import { CountdownModule } from 'ngx-countdown';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamSettingsComponent } from './exam-settings/exam-settings.component';
import { MatRadioModule } from '@angular/material/radio';
import { ShareExamDialogComponent } from './share-exam-dialog/share-exam-dialog.component';
import { MatListModule } from '@angular/material/list';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ResultViewComponent } from './result-view/result-view.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamsViewComponent,
    GroupsViewComponent,
    ExamViewComponent,
    CreateExamDialogComponent,
    CreateQuestionDialogComponent,
    DeleteQuestionModalComponent,
    UpdateQuestionDialogComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
    ExamPreviewComponent,
    ExamResultComponent,
    ExamSettingsComponent,
    ShareExamDialogComponent,
    CreateGroupDialogComponent,
    GroupViewComponent,
    AddMemberDialogComponent,
    ResultViewComponent,
    ResultsViewComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    CountdownModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
