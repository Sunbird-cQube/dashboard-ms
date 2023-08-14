import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBignumberMetricsComponent } from './teacher-bignumber-metrics.component';

describe('TeacherBignumberMetricsComponent', () => {
  let component: TeacherBignumberMetricsComponent;
  let fixture: ComponentFixture<TeacherBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
