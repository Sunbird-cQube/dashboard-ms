import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { config } from '../../views/school-infrastructure/config/school_infrastructure_config';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { parseTimeSeriesQuery, buildQuery, parseFilterToQuery, parseRbacFilter } from 'src/app/utilities/QueryBuilder';
import { DataService } from 'src/app/core/services/data.service';
import { SchoolInfraBigNumberComponent } from './pages/school-infra-big-number/school-infra-big-number.component';
import { SchoolInfraTableDataComponent } from './pages/school-infra-table-data/school-infra-table-data.component';
import { SchoolInfraMapDataComponent } from './pages/school-infra-map-data/school-infra-map-data.component';


@Component({
  selector: 'app-school-infrastructure',
  templateUrl: './school-infrastructure.component.html',
  styleUrls: ['./school-infrastructure.component.scss']
})
export class SchoolInfrastructureComponent implements OnInit {

  bigNumberData: any = {
    reportName: "Schools meeting 100% criteria",
    averagePercentage: 10
  };
  tableReportData: any;
  hasCommonFilters: boolean = true;
  defaultSelectedDays: any;
  hasTimeSeriesFilters: boolean = false;
  reportsData = [];
  reportData: any;
  // title = 'District wise % Schools meeting UDISE Criteria'
  // title: string = 'Review Meetings Status';
  title = {
    1:'District wise % Schools meeting UDISE Criteria',
    2:'Block wise % Schools meeting UDISE Criteria',
    3:'Cluster wise % Schools meeting UDISE Criteria',
    4:'School wise details of meeting UDISE Criteria'
  }
  rbacDetails: any;
  filters: any = [];
  levels: any;
  startDate:any;
  endDate:any;
  // reportName: string = 'review_meetings_status';
  reportName = {
    1:'school_infrastructure_config',
    2:'school_infrastructure_district_config',
    3:'school_infrastructure_block_config',
    4:'school_infrastructure_cluster_config'
  };
  compareDateRange: any = 30;
  config: any;
  @Output() exportReportData = new EventEmitter<any>();

  @ViewChild('schoolInfraBigNumber') schoolInfraBigNumber: SchoolInfraBigNumberComponent;
  @ViewChild('schoolInfraTableData') schoolInfraTableData: SchoolInfraTableDataComponent;
  @ViewChild('schoolInfraMap') schoolInfraMap: SchoolInfraMapDataComponent;
  



  constructor(private readonly _commonService: CommonService,
    private readonly _dataService: DataService,
    private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
      debugger
    })
  }

 async ngOnInit() {
  debugger
    // this.getReportData()
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.hasCommonFilters) {
      this.filters = await this._wrapperService.constructCommonFilters(config.filters)
      this.schoolInfraBigNumber?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
      this.schoolInfraTableData?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
      this.schoolInfraMap?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }
  }

  filtersUpdated(filters: any) {
    this.reportsData = [];
    // this.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    this.schoolInfraBigNumber?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    this.schoolInfraTableData?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    this.schoolInfraMap?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
  }

//   getReportData(values: any): void {
//     let {filterValues, timeSeriesValues} = values ?? {};
//     this.startDate = timeSeriesValues?.startDate;
//     this.endDate = timeSeriesValues?.endDate;
//     let reportConfig = config

//     let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName[this.rbacDetails.role]];
//     let onLoadQuery;

//     if (this.rbacDetails?.role) {
//       filters.every((filter: any) => {
//         if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
//           queries = { ...filter?.actions?.queries }
//           let currentLevel = filter?.actions?.level
//           Object.keys(queries).forEach((key) => {
//             queries[key] = this.parseRbacFilter(queries[key])
//           });
//           return false
//         }
//         return true
//       })
//     }
// debugger
//     Object.keys(queries).forEach(async (key: any) => {
//       if (key.toLowerCase().includes('comparison')) {
//         let endDate = new Date();
//         let days = endDate.getDate() - this.compareDateRange;
//         let startDate = new Date();
//         startDate.setDate(days)
//         onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
//       }
//       else {
//         onLoadQuery = queries[key]
//       }
//       let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

//       filterValues.forEach((filterParams: any) => {
//         query = parseFilterToQuery(query, filterParams)
//       });
// debugger
//       if (query && key === 'table') {
//           this.getTableReportData(query, options);
//       }
//       else if (query && key === 'bigNumber') {
//         this.reportData = await this._dataService.getBigNumberReportData(query, options, 'averagePercentage', this.reportData);
//       }
//       else if (query && key === 'bigNumberComparison') {
//         this.reportData = await this._dataService.getBigNumberReportData(query, options, 'differencePercentage', this.reportData);
//       }
//       else if (query && key === 'barChart') {
//         let {reportData, config} = await this._dataService.getBarChartReportData(query, options, filters, defaultLevel);
//         this.reportData = reportData
//         this.config = config;
//         if (this.reportData?.values?.length > 0) {
//           let reportsData = { reportData: this.reportData.values, reportType: 'dashletBar', reportName: this.title }
//           this.exportReportData.emit(reportsData)
//         }
//       }

//     })
//   }

//   parseRbacFilter(query: string) {
//     let newQuery = query;
//     let startIndex = newQuery?.indexOf('{');
//     let endIndex = newQuery?.indexOf('}');

//     if (newQuery && startIndex > -1) {
//       let propertyName = query.substring(startIndex + 1, endIndex);
//       let re = new RegExp(`{${propertyName}}`, "g");
//       Object.keys(this.rbacDetails).forEach((key: any) => {
//         if (propertyName === key + '_id') {
//           newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
//         }
//       });
//     }
//     return newQuery
//   }

//   async getBigNumberReportData(query: string, options: any, indicator: string): Promise<void> {
//     let { bigNumber } = options ?? {};
//     let { valueSuffix, property } = bigNumber ?? {};
//     if (indicator === 'averagePercentage') {
//       this.bigNumberData = {
//         ...this.bigNumberData,
//         valueSuffix: valueSuffix
//       }
//       await this._commonService.getReportDataNew(query).subscribe((res: any) => {
//         if (res) {
//           debugger
//           let rows = res;
//           this.bigNumberData = {
//             ...this.bigNumberData,
//             averagePercentage: rows[0]?.[property]
//           }
//         }
//       })
//     }
//     else if (indicator === 'differencePercentage') {
//       await this._commonService.getReportDataNew(query).subscribe((res: any) => {
//         if (res) {
//           let rows = res;
//           this.bigNumberData = {
//             ...this.bigNumberData,
//             differencePercentage: rows[0]?.[property]
//           }
//         }
//       })
//     }
//   }

//   getTableReportData(query, options): void {
//     debugger
//     let rows = [
//         {
//         index:1,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       },
//       {
//         index:1,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       },
//       {
//         index:1,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       },
//       {
//         index:1,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       },
//       {
//         index:1,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       },
//       {
//         index:1,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       },
//       {
//         index:2,
//         district_name:'Gujarat',
//         drinking_water: 'Yes',
//         have_toilet: 'No',
//         have_cwsn : 'Yes',
//         have_elec: 'Yes',
//         have_cctv: 'No',
//         have_solar: 'No',
//         have_handwash: 'Yes',
//         hsve_playground: 'No'
//       }
//     ];
//     let { table: { columns } } = options;
//     this.tableReportData = {
//       data: rows.map(row => {
//         columns.forEach((col: any) => {
//           if (row[col.property]) {
//             row = {
//               ...row,
//               [col.property]: { value: row[col.property] }
//             }
//           }
//         });
//         return row
//       }),
//       columns: columns.filter(col => {
//         if (rows[0] && col.property in rows[0]) {
//           return col;
//         }
//       })
//     }
//     if (this.tableReportData?.data?.length > 0) {
//       let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
//       // this.csv.csvDownload(reportsData)
//     }
    
//     // this._commonService.getReportDataNew(query).subscribe((res: any) => {
//     //   let rows = res;
//     //   let { table: { columns } } = options;
//     //   this.tableReportData = {
//     //     data: rows.map(row => {
//     //       columns.forEach((col: any) => {
//     //         if (row[col.property]) {
//     //           row = {
//     //             ...row,
//     //             [col.property]: { value: row[col.property] }
//     //           }
//     //         }
//     //       });
//     //       return row
//     //     }),
//     //     columns: columns.filter(col => {
//     //       if (rows[0] && col.property in rows[0]) {
//     //         return col;
//     //       }
//     //     })
//     //   }
//     //   if (this.tableReportData?.data?.length > 0) {
//     //     let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: '' }
//     //     // this.csv.csvDownload(reportsData)
//     //   }
//     // });
//   }

//   timeSeriesUpdated(event: any): void {
//     this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
//     this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
//     if (event?.startDate !== null && event?.endDate !== null) {
//       this.reportsData = []
//       this.getReportData({timeSeriesValues: {startDate: this.startDate, endDate: this.endDate}});
//     }
//   }

}
