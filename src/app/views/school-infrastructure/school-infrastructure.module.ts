import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolInfrastructureRoutingModule } from './school-infrastructure-routing.module';
import { SchoolInfrastructureComponent } from './school-infrastructure.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolInfraBigNumberComponent } from './pages/school-infra-big-number/school-infra-big-number.component';
import { SchoolInfraTableDataComponent } from './pages/school-infra-table-data/school-infra-table-data.component';
import { SchoolInfraMapDataComponent } from './pages/school-infra-map-data/school-infra-map-data.component';


@NgModule({
  declarations: [
    SchoolInfrastructureComponent,
    SchoolInfraBigNumberComponent,
    SchoolInfraTableDataComponent,
    SchoolInfraMapDataComponent
  ],
  imports: [
    MatTabsModule,
    SharedModule,
    CommonModule,
    SchoolInfrastructureRoutingModule
  ]
})
export class SchoolInfrastructureModule { }
