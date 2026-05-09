import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHomeComponent {

  employeeService = inject(EmployeeService);

  employees = this.employeeService.employees;

  totalEmployees = computed(() =>
    this.employees().length
  );

  activeEmployees = computed(() =>
    this.employees().filter(
      emp => emp.status === 'Active'
    ).length
  );

  totalSalary = computed(() =>
    this.employees().reduce(
      (sum, emp) => sum + emp.salary,
      0
    )
  );

}
