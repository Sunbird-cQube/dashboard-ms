import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInfraMapDataComponent } from './school-infra-map-data.component';

describe('SchoolInfraMapDataComponent', () => {
  let component: SchoolInfraMapDataComponent;
  let fixture: ComponentFixture<SchoolInfraMapDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInfraMapDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInfraMapDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
