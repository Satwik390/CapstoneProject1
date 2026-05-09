import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentService } from '../../../core/services/department.service';

import { DepartmentFormComponent } from '../department-form/department-form';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    CommonModule,
    DepartmentFormComponent
  ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentListComponent {

  departmentService =
    inject(DepartmentService);

  departments =
    this.departmentService.departments;

  deleteDepartment(id: number) {

    this.departmentService.deleteDepartment(id);

  }

  editDepartment(department: any) {

    this.departmentService.selectedDepartment.set(
      department
    );

  }

}