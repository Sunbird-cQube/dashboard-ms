import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { config } from '../../../school-infrastructure/config/school_infrastructure_config';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';

@Component({
  selector: 'app-school-infra-table-data',
  templateUrl: './school-infra-table-data.component.html',
  styleUrls: ['./school-infra-table-data.component.scss']
})
export class SchoolInfraTableDataComponent implements OnInit {
  reportName: string = 'school_infra_create_table_data';
  filters: any = [];
  levels: any;
  reportData: any;
  // title: string = 'Review Meetings Status';
  title = {
    1:'District wise % Schools meeting UDISE Criteria',
    2:'Block wise % Schools meeting UDISE Criteria',
    3:'Cluster wise % Schools meeting UDISE Criteria',
    4:'School wise details of meeting UDISE Criteria'
  }
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
            queries[key] = this.parseRbacFilter(queries[key])
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
        this.getTableReportData(query,options);
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

  parseRbacFilter(query: string) {
    let newQuery = query;
    let startIndex = newQuery?.indexOf('{');
    let endIndex = newQuery?.indexOf('}');

    if (newQuery && startIndex > -1) {
        let propertyName = query.substring(startIndex + 1, endIndex);
        let re = new RegExp(`{${propertyName}}`, "g");
        Object.keys(this.rbacDetails).forEach((key: any) => {
            if (propertyName === key + '_id') {
                newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
            }
        });
    }
    return newQuery
}

  getTableReportData(query, options): void {
    let rows = [
        {
        index:1,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      },
      {
        index:1,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      },
      {
        index:1,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      },
      {
        index:1,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      },
      {
        index:1,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      },
      {
        index:1,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      },
      {
        index:2,
        district_name:'Gujarat',
        drinking_water: 'Yes',
        have_toilet: 'No',
        have_cwsn : 'Yes',
        have_elec: 'Yes',
        have_cctv: 'No',
        have_solar: 'No',
        have_handwash: 'Yes',
        hsve_playground: 'No'
      }
    ];
    let { table: { columns } } = options;
    this.reportData = {
      data: rows.map(row => {
        columns.forEach((col: any) => {
          if (row[col.property]) {
            row = {
              ...row,
              [col.property]: { value: row[col.property] }
            }
          }
        });
        return row
      }),
      columns: columns.filter(col => {
        if (rows[0] && col.property in rows[0]) {
          return col;
        }
      })
    }
    if (this.reportData?.data?.length > 0) {
      let reportsData = { reportData: this.reportData.data, reportType: 'table', reportName: this.title }
      // this.csv.csvDownload(reportsData)
    }
    
    // this._commonService.getReportDataNew(query).subscribe((res: any) => {
    //   let rows = res;
    //   let { table: { columns } } = options;
    //   this.tableReportData = {
    //     data: rows.map(row => {
    //       columns.forEach((col: any) => {
    //         if (row[col.property]) {
    //           row = {
    //             ...row,
    //             [col.property]: { value: row[col.property] }
    //           }
    //         }
    //       });
    //       return row
    //     }),
    //     columns: columns.filter(col => {
    //       if (rows[0] && col.property in rows[0]) {
    //         return col;
    //       }
    //     })
    //   }
    //   if (this.tableReportData?.data?.length > 0) {
    //     let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: '' }
    //     // this.csv.csvDownload(reportsData)
    //   }
    // });
  }

}


