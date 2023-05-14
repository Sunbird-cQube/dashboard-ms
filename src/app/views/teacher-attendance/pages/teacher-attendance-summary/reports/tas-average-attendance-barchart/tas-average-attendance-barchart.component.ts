import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from '../../../../config/teacher_attendance_config';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
@Component({
  selector: 'app-tas-average-attendance-barchart',
  templateUrl: './tas-average-attendance-barchart.component.html',
  styleUrls: ['./tas-average-attendance-barchart.component.scss']
})
export class TasAverageAttendanceBarchartComponent implements OnInit {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "% Teachers Present";
  reportName: string = 'tas_average_attendance_barchart';
  filters: any = [];
  levels: any;
  tableReportData: any;
  minDate: any;
  maxDate: any;
  filterIndex: any;
  currentHierarchyLevel: any = 1;
  rbacDetails: any;
  pageSize: any;

  @Output() exportDates = new EventEmitter<any>();
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(private readonly _commonService: CommonService,
    private readonly _wrapperService: WrapperService, private _rbacService: RbacService, private readonly _reportDrilldownService: ReportDrilldownService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
    this._reportDrilldownService.drilldownData.subscribe(data => {
      if (data && data.linkedReports?.includes(this.reportName) && data.hierarchyLevel) {
        this.drilldownData(data);
      }
    })
  }

  ngOnInit(): void {
    // this.getReportData();
  }

  async getReportData(startDate = undefined, endDate = undefined): Promise<void> {
    console.log('innnn bar report data');
    this.startDate = startDate;
    this.endDate = endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          timeSeriesQueries = { ...filter?.timeSeriesQueries }
          Object.keys(queries).forEach((key) => {
            timeSeriesQueries[key] = parseRbacFilter(timeSeriesQueries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }


    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

      if (query && key === 'barChart') {
        this.getBarChartReportData(query, options, filters, defaultLevel);
      }


    })
  }

  getBarChartReportData(query, options, filters, defaultLevel): void {
    let { barChart: { yAxis, xAxis, isMultibar, metricLabelProp, metricValueProp, tooltipMetrics } } = options;
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      // if(isMultibar){
      //   rows = multibarGroupBy(rows, xAxis.label, metricLabelProp, metricValueProp);
      // }
      this.tableReportData = {
        values: rows
      }
      let tooltipObject
      this.tableReportData.values.forEach((row) => {
        let tooltip = this._wrapperService.constructTooltip(tooltipMetrics,row, metricValueProp, 'barChart')
        tooltipObject = {
          ...tooltipObject,
          [row.level]: tooltip
        }
      });
      console.log(tooltipObject)
      this.config = getChartJSConfig({
        labelExpr: xAxis.value,
        datasets: getBarDatasetConfig(
          [{
            dataExpr: metricValueProp, label: metricLabelProp
          }]),

        options: {
          height: '120',
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                // let multistringText = [];
                // multistringText.push(`${data.datasets[0].label} : ${tooltipItem.value}%`)

                // return multistringText;
                return tooltipObject[tooltipItem.label]
              }
            }
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: yAxis.title !== 'level' ? yAxis.title : this.getYaxisTitle(filters) ? this.getYaxisTitle(filters) : defaultLevel
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: xAxis.title
              },
              ticks: {
                callback: function (value, index, values) {
                  let newValue = value.split('_').map((word: any) => word[0].toUpperCase() + word.substring(1)).join(' ')
                  if (screen.width <= 768) {
                    return newValue.substr(0, 8) + '...';
                  } else {
                    return newValue;
                  }
                }
              }
            }]
          }
        }
      });
      if (this.tableReportData?.values?.length > 0) {
        let reportsData = { reportData: this.tableReportData.values, reportType: 'dashletBar', reportName: this.fileName }
        // this.csv.csvDownload(reportsData)
      }
    });
  }

  getYaxisTitle(filters: any): string {
    let title: string;
    filters.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === this.currentHierarchyLevel - 1) {
        title = filter?.actions?.level;
      }
    });
    return title;
  }

  async drilldownData(event: any) {
    let { hierarchyLevel, id } = event ?? {}
    let drillDownDetails;

    switch (Number(hierarchyLevel)) {
      case 1:
        drillDownDetails = {
          ...this.rbacDetails,
          state: id
        }
        break;
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          district: id
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          block: id
        }
        break;
      case 4:
        drillDownDetails = {
          ...this.rbacDetails,
          cluster: id
        }
        break;
    }

    let reportConfig = config;

    let { timeSeriesQueries, queries, levels, label, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(hierarchyLevel) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          timeSeriesQueries = { ...filter?.timeSeriesQueries }
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], drillDownDetails)
            timeSeriesQueries[key] = parseRbacFilter(timeSeriesQueries[key], drillDownDetails)
          });
          return false
        }
        return true
      })
    } else {
      this._wrapperService.constructFilters(this.filters, filters);
    }

    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, undefined);

      if (query && key === 'barChart') {
        this.getBarChartReportData(query, options, filters, defaultLevel);
      }
    });
  }


}
