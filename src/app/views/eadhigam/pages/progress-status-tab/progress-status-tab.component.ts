import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/eadhigam_config';
import { ProgressStatusComponent } from './reports/progress-status/progress-status.component';
import { environment } from 'src/environments/environment';
import { EtbCoverageStatusComponent } from './reports/etb-coverage-status/etb-coverage-status.component';
import { AppUsageTableComponent } from './reports/app-usage-table/app-usage-table.component';

import { MatTableDataSource } from '@angular/material/table';
import { appUsageData, homeworkAssignmentData, remedialTestData } from '../../config/student_records';

@Component({
    selector: 'app-progress-status-tab',
    templateUrl: './progress-status-tab.component.html',
    styleUrls: ['./progress-status-tab.component.scss']
})
export class ProgressStatusTabComponent implements OnInit, AfterViewInit {
    appUsageData:any;
    homeworkAssignmentData: any;
    remedialTestData: any;
    displayedColumns: string[] = ['block', 'school', 'remedial', 'grade', 'student_name', 'student_srn', 'district'];

    bigNumberReports: any = {};
    minYear: any;
    maxYear: any;
    minMonth: any;
    maxMonth: any;
    academicYear: any = [];
    months: any = [];
    filters: any;
    reportsToBeShown: any = [];
    rbacDetails: any;
    reportsData: any = [];
    startDate: any;
    endDate: any;
    defaultSelectedDays: any;
    hasTimeSeriesFilters: boolean = false;
    hasCommonFilters: boolean = true;
    NVSK: boolean = true;

    displayedColumnsHeadsAppUsage: string[] = [  "block",  "school",  "grade",  "student_name",  "student_srn"]
    displayedColumnsAppUsage: any[] = [
    { title: 'Block', column: 'block' },
    { title: 'School', column: 'school' },
    { title: 'Remedial', column: 'remedial' },
    { title: 'Grade', column: 'grade' },
    { title: 'Student Name', column: 'student_name' },
    { title: 'Student SRN', column: 'student_srn' },
 
  ];

    @ViewChild('progressStatus') progressStatus: ProgressStatusComponent;
    @ViewChild('etbCoverageStatus') etbCoverageStatus: EtbCoverageStatusComponent;
    @ViewChild('etbCoverageStatus1') etbCoverageStatus1: EtbCoverageStatusComponent;
    @ViewChild('etbCoverageStatus2') etbCoverageStatus2: EtbCoverageStatusComponent;
    @ViewChild('appUsageTable') appUsageTable: AppUsageTableComponent;

    @Input() bigNumberMetrics: any = [];

    constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
        console.log("venom:")
        this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
            this.rbacDetails = rbacDetails;
        })
        if (environment.config === 'VSK') {
            this.NVSK = false
        }
    }

    async ngOnInit(): Promise<void> {

        this.appUsageData =new MatTableDataSource(appUsageData) ;
        // this.homeworkAssignmentData = new MatTableDataSource(homeworkAssignmentData);
        // this.remedialTestData = new MatTableDataSource(remedialTestData);
    }



    async ngAfterViewInit(): Promise<void> {
        // if (this.hasCommonFilters) {
        //     console.log("venom: true")

        // }
        // if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
        //     console.log("venom: true 2")
        //     let endDate = new Date();
        //     let days = endDate.getDate() - this.defaultSelectedDays;
        //     let startDate = new Date();
        //     startDate.setDate(days);
        //     this.progressStatus?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
        // }
        this.filters = await this._wrapperService.constructCommonFilters(config.filters);

        this.progressStatus?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        this.etbCoverageStatus?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        this.etbCoverageStatus1?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        this.etbCoverageStatus2?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });

    }

    checkReport(key: string, reportType: string): Boolean {

        let reportConfig = config;
        let flag = false;
        reportConfig[key]?.filters?.forEach((filter: any) => {

            if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && Object.keys(filter?.actions?.queries).includes(reportType)) {
                flag = true
            }
        })
        return flag
    }

    csvDownload(csvData: any) {
        if (csvData) {
            this.reportsData.push(csvData)
        }
    }

    filtersUpdated(filters: any) {
        console.log("venom: true 4")
        this.reportsData = [];
        this.progressStatus?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }

    timeSeriesUpdated(event: any): void {
        console.log("venom: 5")
        this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
        this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
        if (event?.startDate !== null && event?.endDate !== null) {
            this.reportsData = [];
            this.progressStatus?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
        }
    }


    importBigNumberMetrics(bigNumberMetric: any) {
        this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
    }
}
