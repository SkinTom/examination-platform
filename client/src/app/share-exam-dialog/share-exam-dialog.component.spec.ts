import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareExamDialogComponent } from './share-exam-dialog.component';

describe('ShareExamDialogComponent', () => {
  let component: ShareExamDialogComponent;
  let fixture: ComponentFixture<ShareExamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareExamDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareExamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
