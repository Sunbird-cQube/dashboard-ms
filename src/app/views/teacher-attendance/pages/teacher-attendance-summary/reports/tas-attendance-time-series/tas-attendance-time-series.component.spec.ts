import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasAttendanceTimeSeriesComponent } from './tas-attendance-time-series.component';

describe('TasAverageAttendanceBarchartComponent', () => {
  let component: TasAttendanceTimeSeriesComponent;
  let fixture: ComponentFixture<TasAttendanceTimeSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasAttendanceTimeSeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasAttendanceTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
