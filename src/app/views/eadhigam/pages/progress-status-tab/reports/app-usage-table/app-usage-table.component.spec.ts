import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsageTableComponent } from './app-usage-table.component';

describe('AppUsageTableComponent', () => {
  let component: AppUsageTableComponent;
  let fixture: ComponentFixture<AppUsageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUsageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUsageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
