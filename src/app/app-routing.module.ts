import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { RbacDialogComponent } from './shared/components/rbac-dialog/rbac-dialog.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { AuthGuard } from './core/guards/auth.guard';

var routes: Routes = [];


routes = [
  {
    path: '', redirectTo: `home`, pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'rbac', component: RbacDialogComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'home', component: HomePageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'summary-statistics',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'student-attendance',
        loadChildren: () =>
          import('./views/student-attendance/student-attendance.module').then(
            (module) => module.StudentAttendanceModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'teacher-attendance',
        loadChildren: () =>
          import('./views/teacher-attendance/teacher-attendance.module').then(
            (module) => module.TeacherAttendanceModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'review-meetings',
        loadChildren: () =>
          import('./views/review-meetings/review-meetings.module').then(
            (module) => module.ReviewMeetingsModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'udise',
        loadChildren: () =>
          import('./views/udise/udise.module').then(
            (module) => module.UdiseModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'nishtha',
        loadChildren: () =>
          import('./views/nishtha/nishtha.module').then(
            (module) => module.NishthaModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'pgi',
        loadChildren: () =>
          import('./views/pgi/pgi.module').then(
            (module) => module.PgiModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'pmposhan',
        loadChildren: () =>
          import('./views/pmposhan/pmposhan.module').then(
            (module) => module.PmPoshanModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'nas',
        loadChildren: () =>
          import('./views/nas/nas.module').then(
            (module) => module.NasModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'diksha',
        loadChildren: () =>
          import('./views/diksha/diksha.module').then(
            (module) => module.DikshaModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'schoolInfra',
        loadChildren: () =>
          import('./views/school-infrastructure/school-infrastructure.module').then(
            (module) => module.SchoolInfrastructureModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'studentProgress',
        loadChildren: () =>
          import('./views/student-progression/student-progression.module').then(
            (module) => module.StudentProgressionModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'student-assessment',
        loadChildren: () =>
            import('./views/student-assessment/student-assessment.module').then(
                (module) => module.StudentAssessmentModule
            ),
        canLoad: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
