import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login';

import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home';

import { EmployeeListComponent } from './features/employees/employee-list/employee-list';

import { DepartmentListComponent } from './features/departments/department-list/department-list';

import { AttendanceListComponent } from './features/attendance/attendance-list/attendance-list';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout';

import { authGuard } from './core/guards/auth.guard';

import { PerformanceListComponent } from './features/performance/performance-list/performance-list';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: DashboardHomeComponent
      },

      {
        path: 'employees',
        component: EmployeeListComponent
      },

      {
        path: 'departments',
        component: DepartmentListComponent
      },

      {
        path: 'attendance',
        component: AttendanceListComponent
      },

      {
        path: 'performance',
        component: PerformanceListComponent
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  }

];