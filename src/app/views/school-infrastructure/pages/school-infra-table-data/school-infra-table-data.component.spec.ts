import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInfraTableDataComponent } from './school-infra-table-data.component';

describe('SchoolInfraTableDataComponent', () => {
  let component: SchoolInfraTableDataComponent;
  let fixture: ComponentFixture<SchoolInfraTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInfraTableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInfraTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
