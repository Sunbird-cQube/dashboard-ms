import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedialDataComponent } from './remedial-data.component';

describe('RemedialDataComponent', () => {
  let component: RemedialDataComponent;
  let fixture: ComponentFixture<RemedialDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemedialDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemedialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
