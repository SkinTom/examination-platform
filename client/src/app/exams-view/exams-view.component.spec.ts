import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsViewComponent } from './exams-view.component';

describe('ExamsViewComponent', () => {
  let component: ExamsViewComponent;
  let fixture: ComponentFixture<ExamsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
