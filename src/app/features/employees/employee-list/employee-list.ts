import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmployeeFormComponent
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent {

  private employeeService = inject(EmployeeService);

  employees = this.employeeService.employees;

  // Search
  searchTerm = signal('');

  // Filter
  selectedStatus = signal('All');

  // Sort
  sortOrder = signal('None');

  // Pagination
  currentPage = signal(1);
  itemsPerPage = 5;

  // Search + Filter + Sort
  filteredEmployees = computed(() => {
    let list = [...this.employees()];

    // Search by employee name
    const search = this.searchTerm().toLowerCase().trim();
    if (search) {
      list = list.filter(emp =>
        emp.name.toLowerCase().includes(search)
      );
    }

    // Filter by status
    if (this.selectedStatus() !== 'All') {
      list = list.filter(emp =>
        emp.status === this.selectedStatus()
      );
    }

    // Sort by salary
    if (this.sortOrder() === 'Ascending') {
      list.sort((a, b) => a.salary - b.salary);
    } else if (this.sortOrder() === 'Descending') {
      list.sort((a, b) => b.salary - a.salary);
    }

    return list;
  });

  // Total pages after filtering
  totalPages = computed(() => {
    const total = Math.ceil(
      this.filteredEmployees().length / this.itemsPerPage
    );
    return total || 1;
  });

  // Final paginated data
  paginatedEmployees = computed(() => {
    const start =
      (this.currentPage() - 1) * this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredEmployees().slice(start, end);
  });

  // Reset to first page when filters change
  updateSearch(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  updateStatus(value: string) {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
  }

  updateSort(value: string) {
    this.sortOrder.set(value);
    this.currentPage.set(1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);

    if (
      this.currentPage() > this.totalPages() &&
      this.currentPage() > 1
    ) {
      this.currentPage.update(page => page - 1);
    }
  }
}