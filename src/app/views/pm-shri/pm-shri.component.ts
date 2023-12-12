import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from './config/pm_shri_config';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pm-shri',
  templateUrl: './pm-shri.component.html',
  styleUrls: ['./pm-shri.component.scss']
})
export class PmShriComponent implements OnInit {

  loadTabs = false;
  rbacDetails: any;
  tabIndex;
  selectedTabLabel;
  tabs: any = [];
  programName: any = 'pm_shri';
  bigNumberMetrics: any = [];
  NVSK: boolean = true;
  url:string = 'https://g120d41e0b7eddc-vskdevdb.adb.ap-mumbai-1.oraclecloudapps.com/ords/r/vskdev/udise/home?session=110658119291029';
  //url:string = 'https://g120d41e0b7eddc-vskdatabase.adb.ap-mumbai-1.oraclecloudapps.com/ords/r/pmshri/pm-shri/home?session=213816915034277';
  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private _rbacService: RbacService, private _commonService: CommonService) {
    this.route.queryParams.subscribe((param: any) => {
        this.tabIndex = param.tab ? Number(param.tab) : 0;
    })
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
        this.rbacDetails = rbacDetails;
    })
    let allTabs = [...Object.keys(config)]
    allTabs.forEach((tab: any) => {
      config?.[tab]?.filters?.every((filter) => {
        if ((Number(filter?.hierarchyLevel) === this.rbacDetails?.role) || this.rbacDetails?.role === 0) {
          if (!(this.tabs.includes(config?.[tab]?.label))) {
              this.tabs.push(config?.[tab]?.label)
          }
          return false
        }
        return true
      })
    })
    if(environment.config === 'VSK') {
      this.NVSK = false;
    }
  }

  ngOnInit(): void {
	this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this._commonService.getMetaData(this.programName).subscribe()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        this.selectedTabLabel = this.tabs.length > 0 ? this.tabs[0] : undefined
    });
  }

  onTabChanged($event: any): void {
    this.selectedTabLabel = $event?.tab?.textLabel;
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  checkReport(key: string, reportType: string): Boolean {
    let reportConfig = config;
    let flag = false;
    reportConfig[key]?.filters?.forEach((filter: any) => {
        if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && Object.keys(filter?.actions?.queries).includes(reportType)) {
          flag = true;
        }
    });
    
    return flag;
  }

  importBigNumberMetrics(bigNumberMetric: any) {
    this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
  }

}
