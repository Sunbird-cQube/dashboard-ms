import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeSeriesComponent} from './time-series.component';

describe('BarChartComponent', () => {
    let component: TimeSeriesComponent;
    let fixture: ComponentFixture<TimeSeriesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimeSeriesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TimeSeriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});