import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as Title from '../../../../assets/config/title_config.json'
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
import { IDashboardMenu } from '../../models/IDashboardCard';
import { IMenuItem } from '../../models/IMenuItem';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonService } from '../../services/common/common.service';
import { RbacService } from '../../services/rbac-service.service';
import { configFiles } from '../../config/configMapping'
import { of } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menu: IMenuItem[] | undefined;
  national: boolean = true;
  role: any;
  config = 'state';
  isHome: boolean = false;
  showBackBtn: boolean = false;
  // Font Increase Decrease Variables
  fontSize: any;
  defaultFontSize = 16;
  @ViewChild('increaseFontSize')
  increaseFontSize!: ElementRef;
  @ViewChild('decreaseFontSize')
  decreaseFontSize!: ElementRef;
  @ViewChild('resetFontSize')
  resetFontSize!: ElementRef;
  environment = environment;
  title: any;
  hierarchyLevel: any;
  // @ViewChild('darkModeToggle') darkModeToggle: ElementRef;
  constructor(private readonly _commonService: CommonService, private renderer: Renderer2, private _router: Router, private rbac: RbacService) {

    if (this._router.url === '/home' || this._router.url === '/rbac') {
      this.isHome = true;
    }
    else {
      this.isHome = false;
    }

    if (this._router.url !== '/home') {
      this.showBackBtn = true
    }
    else {
      this.showBackBtn = false
    }


  }

  ngOnInit(): void {
    this.title = Title
    if (this.config === 'state') {
      this.national = false;
    }
    this.role = localStorage.getItem('role');
  }

  checkRbacLevel() {
    const programIds = Object.keys(configFiles);
    const hierarchyLevels = {};
    programIds.forEach(key => {
      const programObject = configFiles[key];
      const reportNames = Object.keys(programObject);
      reportNames.forEach(reportName => {
        const reportObject = programObject[reportName];
        const filters = reportObject.filters;
        if (filters) {
          filters.forEach(element => {
            if (element.hierarchyLevel) {
              if (!hierarchyLevels[key]) {
                hierarchyLevels[key] = [];
              }
              if (!hierarchyLevels[key].includes(element.hierarchyLevel)) {
                hierarchyLevels[key].push(element.hierarchyLevel);
              }
            }
          });

        }
      });
    });

    this._commonService.getDashboardMetrics().subscribe((menuResult: any) => {
      this.menu = [];
      let rbacRole;
      this.rbac.getRbacDetails().subscribe((rbacDetails: any) => {
        rbacRole = rbacDetails.role;
      })
      menuResult?.data?.forEach((dasboardMenu: IDashboardMenu | any) => {

        if (hierarchyLevels[dasboardMenu.programID].includes(String(rbacRole))) {

          let menuToDisplay: IMenuItem | any = {};
          menuToDisplay.label = dasboardMenu.menuName;
          menuToDisplay.path = dasboardMenu.navigationUrl;
          menuToDisplay.icon = dasboardMenu.imageUrl;
          menuToDisplay.isSelected = false;

          this.menu?.push(menuToDisplay);
        }

      });
    })

  }
  rbacdetails() {
    return this.rbac.getRbacDetails()
  }

  // Change Font Size (Increase & Decrease)
  getLocalFontSize() {
    const localFontSize = localStorage.getItem('fontSize');
    if (localFontSize) {
      document.documentElement.style.setProperty('font-size', localFontSize + 'px');
      this.fontSize = localFontSize;
      this.isDisableFontSize(localFontSize);
    }
  }
  changeFontSize(value: string) {

    const elFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');

    const localFontSize = localStorage.getItem('fontSize');
    const currentFontSize = localFontSize ? localFontSize : elFontSize;
    this.fontSize = parseInt(currentFontSize);

    if (value === 'increase') {
      this.renderer.setAttribute(this.increaseFontSize.nativeElement, 'aria-pressed', 'true');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'aria-pressed');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'aria-pressed');
      this.fontSize = this.fontSize + 2;
      if (this.fontSize <= 24) {
        this.setLocalFontSize(this.fontSize);
      }
    } else if (value === 'decrease') {
      this.renderer.setAttribute(this.decreaseFontSize.nativeElement, 'aria-pressed', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'aria-pressed');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'aria-pressed');
      this.fontSize = this.fontSize - 2;
      if (this.fontSize >= 12) {
        this.setLocalFontSize(this.fontSize);
      }
    } else {
      this.renderer.setAttribute(this.resetFontSize.nativeElement, 'aria-pressed', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'aria-pressed');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'aria-pressed');
      this.setLocalFontSize(this.defaultFontSize);
    }

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500)
  }

  setLocalFontSize(value: any) {
    document.documentElement.style.setProperty('font-size', value + 'px');
    localStorage.setItem('fontSize', value);
    this.isDisableFontSize(value);
  }

  isDisableFontSize(value: any) {
    value = parseInt(value);
    if (value === 24) {
      this.renderer.setAttribute(this.increaseFontSize.nativeElement, 'disabled', 'true');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'disabled');
    } else if (value === 12) {
      this.renderer.setAttribute(this.decreaseFontSize.nativeElement, 'disabled', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'disabled');
    } else if (value === 16) {
      this.renderer.setAttribute(this.resetFontSize.nativeElement, 'disabled', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'disabled');
    } else {
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'disabled');
    }
  }

  activate() {

    if (this._router.url === '/home' || this._router.url === '/rbac') {
      this.isHome = true;
    }
    else {
      this.isHome = false;
      this.checkRbacLevel()
    }
    if (this._router.url !== '/home') {
      this.showBackBtn = true
    }
    else {
      this.showBackBtn = false
    }
  }

}
