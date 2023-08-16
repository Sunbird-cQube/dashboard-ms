import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {PmPoshanRoutingModule} from './pmposhan-routing.module';
import {PmPoshanComponent} from './pmposhan.component';

import {ProgressStatusTabComponent} from './pages/progress-status-tab/progress-status-tab.component';
import {ProgressStatusComponent} from './pages/progress-status-tab/reports/progress-status/progress-status.component';
import { PmposhanBignumberMetricsComponent } from './pages/progress-status-tab/reports/pmposhan-bignumber-metrics/pmposhan-bignumber-metrics.component';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { StateWiseProgressStatusTabComponent } from './pages/state-wise-progress-status-tab/state-wise-progress-status-tab.component';
import { StateWiseProgressStatusComponent } from './pages/state-wise-progress-status-tab/reports/state-wise-progress-status/state-wise-progress-status.component';
import { EtbCoverageStatusComponent } from './pages/progress-status-tab/reports/etb-coverage-status/etb-coverage-status.component';
import { TeacherBignumberMetricsComponent } from './pages/implementation-status-tab/reports/teacher-bignumber-metrics/teacher-bignumber-metrics.component';
import { TeacherTableComponent } from './pages/implementation-status-tab/reports/teacher-table/teacher-table.component';
import { MatTableModule } from '@angular/material/table';
import { AppUsageTableComponent } from './pages/progress-status-tab/reports/app-usage-table/app-usage-table.component';
import { HomeAssignmentComponent } from './pages/progress-status-tab/reports/home-assignment/home-assignment.component';
import { RemedialDataComponent } from './pages/progress-status-tab/reports/remedial-data/remedial-data.component';

@NgModule({
declarations: [
    PmPoshanComponent,
    ProgressStatusTabComponent,
    ProgressStatusComponent,
    PmposhanBignumberMetricsComponent,
    ImplementationStatusTabComponent,
    ImplementationStatusComponent,
    StateWiseProgressStatusTabComponent,
    StateWiseProgressStatusComponent,
    EtbCoverageStatusComponent,
    TeacherBignumberMetricsComponent,
    TeacherTableComponent,
    AppUsageTableComponent,
    HomeAssignmentComponent,
    RemedialDataComponent,
    
],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    PmPoshanRoutingModule,
    MatTableModule
]
})
export class PmPoshanModule { }
