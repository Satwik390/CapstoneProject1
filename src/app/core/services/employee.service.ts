import { Injectable, signal } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees = signal<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'IT',
      role: 'Frontend Developer',
      salary: 60000,
      status: 'Active'
    },

    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      department: 'HR',
      role: 'HR Manager',
      salary: 75000,
      status: 'Active'
    }
  ]);

  addEmployee(employee: Employee) {

    this.employees.update(current => [
      ...current,
      employee
    ]);

  }

  deleteEmployee(id: number) {

    this.employees.update(current =>
      current.filter(emp => emp.id !== id)
    );

  }

}