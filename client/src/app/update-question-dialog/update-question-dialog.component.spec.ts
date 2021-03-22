import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuestionDialogComponent } from './update-question-dialog.component';

describe('UpdateQuestionDialogComponent', () => {
  let component: UpdateQuestionDialogComponent;
  let fixture: ComponentFixture<UpdateQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
