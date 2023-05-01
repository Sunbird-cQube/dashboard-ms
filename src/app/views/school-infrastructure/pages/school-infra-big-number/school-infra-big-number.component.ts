import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { config } from '../../../school-infrastructure/config/school_infrastructure_config';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { parseRbacFilter, parseTimeSeriesQuery, buildQuery, parseFilterToQuery } from 'src/app/utilities/QueryBuilder';

@Component({
  selector: 'app-school-infra-big-number',
  templateUrl: './school-infra-big-number.component.html',
  styleUrls: ['./school-infra-big-number.component.scss']
})
export class SchoolInfraBigNumberComponent implements OnInit {
  reportName: string = 'school_infra_conducted_bignumber';
  filters: any = [];
  levels: any;
  reportData: any;
  title: string = 'Review Meetings Status';
  startDate: any;
  endDate: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;

  @Output() exportReportData = new EventEmitter<any>();

  constructor(private readonly _dataService: DataService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
  }

  getReportData(values: any): void {
    let {filterValues, timeSeriesValues} = values ?? {};
    this.startDate = timeSeriesValues?.startDate;
    this.endDate = timeSeriesValues?.endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = {...filter?.actions?.queries}
          let currentLevel = filter?.actions?.level
          let nextLevel = filter?.actions?.nextLevel
          // this.title = `${currentLevel[0].toUpperCase() + currentLevel.substring(1)}-wise % ${nextLevel[0].toUpperCase() + nextLevel.substring(1)}s which conducted meeting`
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }

    Object.keys(queries).forEach(async (key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      filterValues.forEach((filterParams: any) => {
        query = parseFilterToQuery(query, filterParams)
      });

      if (query && key === 'table') {
        this.reportData = await this._dataService.getTableReportData(query, options);
        if (this.reportData?.data?.length > 0) {
          let reportsData = { reportData: this.reportData.data, reportType: 'table', reportName: this.title }
          this.exportReportData.emit(reportsData)
        }
      }
      else if (query && key === 'bigNumber') {
        this.reportData = await this._dataService.getBigNumberReportData(query, options, 'averagePercentage', this.reportData);
      }
      else if (query && key === 'bigNumberComparison') {
        this.reportData = await this._dataService.getBigNumberReportData(query, options, 'differencePercentage', this.reportData);
      }
      else if (query && key === 'barChart') {
        let {reportData, config} = await this._dataService.getBarChartReportData(query, options, filters, defaultLevel);
        this.reportData = reportData
        if (this.reportData?.values?.length > 0) {
          let reportsData = { reportData: this.reportData.values, reportType: 'dashletBar', reportName: this.title }
          this.exportReportData.emit(reportsData)
        }
      }
    })
  }

}
