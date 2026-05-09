import { Injectable, signal } from '@angular/core';

import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments = signal<Department[]>([

    {
      id: 1,
      name: 'IT',
      manager: 'David Miller',
      employeeCount: 25
    },

    {
      id: 2,
      name: 'HR',
      manager: 'Sophia Johnson',
      employeeCount: 10
    },

    {
      id: 3,
      name: 'Finance',
      manager: 'Michael Brown',
      employeeCount: 8
    }

  ]);

  selectedDepartment =
    signal<Department | null>(null);

  addDepartment(department: Department) {

    this.departments.update(current => [
      ...current,
      department
    ]);

  }

  deleteDepartment(id: number) {

    this.departments.update(current =>

      current.filter(dep => dep.id !== id)

    );

  }

  updateDepartment(updatedDepartment: Department) {

    this.departments.update(current =>

      current.map(dep =>

        dep.id === updatedDepartment.id
          ? updatedDepartment
          : dep

      )

    );

  }

}