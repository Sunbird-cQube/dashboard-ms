import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInfraBigNumberComponent } from './school-infra-big-number.component';

describe('SchoolInfraBigNumberComponent', () => {
  let component: SchoolInfraBigNumberComponent;
  let fixture: ComponentFixture<SchoolInfraBigNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInfraBigNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInfraBigNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
