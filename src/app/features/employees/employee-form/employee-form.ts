import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {

  fb = inject(FormBuilder);

  employeeService = inject(EmployeeService);

  employeeForm = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    department: [
      '',
      Validators.required
    ],

    role: [
      '',
      Validators.required
    ],

    salary: [
      '',
      Validators.required
    ],

    status: [
      '',
      Validators.required
    ]

  });

  addEmployee() {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const newEmployee = {

      id: this.employeeService.employees().length + 1,

      ...this.employeeForm.value

    };

    this.employeeService.addEmployee(newEmployee as any);

    this.employeeForm.reset();

  }

}