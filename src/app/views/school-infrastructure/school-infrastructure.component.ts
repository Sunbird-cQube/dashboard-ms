import { Component, OnInit } from '@angular/core';
import { config } from '../../views/school-infrastructure/config/school_infrastructure_config';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { parseTimeSeriesQuery, buildQuery } from 'src/app/utilities/QueryBuilder';


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
  // title = 'District wise % Schools meeting UDISE Criteria'
  title = {
    1:'District wise % Schools meeting UDISE Criteria',
    2:'Block wise % Schools meeting UDISE Criteria',
    3:'Cluster wise % Schools meeting UDISE Criteria',
    4:'School wise details of meeting UDISE Criteria'
  }
  rbacDetails: any;
  filters: any = [];
  levels: any;
  reportName = {
    1:'school_infrastructure_config',
    2:'school_infrastructure_district_config',
    3:'school_infrastructure_block_config',
    4:'school_infrastructure_cluster_config'
  }

  constructor(private readonly _commonService: CommonService,
    private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
      debugger
    })
  }

  ngOnInit(): void {
    this.getReportData()
  }


  getReportData(startDate = undefined, endDate = undefined): void {
    // this.startDate = startDate;
    // this.endDate = endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, label, defaultLevel, filters, options } = reportConfig[this.reportName[this.rbacDetails.role]];
    let onLoadQuery;
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          timeSeriesQueries = { ...filter?.timeSeriesQueries }
          Object.keys(queries).forEach((key) => {
            queries[key] = this.parseRbacFilter(queries[key])
            timeSeriesQueries[key] = this.parseRbacFilter(timeSeriesQueries[key])
          });
          return false
        }
        return true
      })
    }
    else {
      // this._wrapperService.constructFilters(this.filters, filters);
    }

    Object.keys(queries).forEach((key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }

      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, '', '', key, '');

      if (query && key === 'table') {
        this.getTableReportData(query, options);
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

  async getBigNumberReportData(query: string, options: any, indicator: string): Promise<void> {
    let { bigNumber } = options ?? {};
    let { valueSuffix, property } = bigNumber ?? {};
    if (indicator === 'averagePercentage') {
      this.bigNumberData = {
        ...this.bigNumberData,
        valueSuffix: valueSuffix
      }
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          debugger
          let rows = res;
          this.bigNumberData = {
            ...this.bigNumberData,
            averagePercentage: rows[0]?.[property]
          }
        }
      })
    }
    else if (indicator === 'differencePercentage') {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let rows = res;
          this.bigNumberData = {
            ...this.bigNumberData,
            differencePercentage: rows[0]?.[property]
          }
        }
      })
    }
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
    this.tableReportData = {
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
    if (this.tableReportData?.data?.length > 0) {
      let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
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
