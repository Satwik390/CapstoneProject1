import {
  Component,
  inject,
  effect
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css'
})
export class DepartmentFormComponent {

  fb = inject(FormBuilder);

  departmentService =
    inject(DepartmentService);

  departmentForm = this.fb.group({

    name: ['', Validators.required],

    manager: ['', Validators.required],

    employeeCount: [
      '',
      Validators.required
    ]

  });

  constructor() {

    effect(() => {

      const department =
        this.departmentService.selectedDepartment();

      if (department) {

        this.departmentForm.patchValue({

          name: department.name,

          manager: department.manager,

          employeeCount:
            department.employeeCount.toString()

        });

      }

    });

  }

  onSubmit() {

    if (this.departmentForm.invalid) {

      this.departmentForm.markAllAsTouched();

      return;

    }

    const existingDepartment =
      this.departmentService.selectedDepartment();

    if (existingDepartment) {

      const updatedDepartment = {

        id: existingDepartment.id,

        ...this.departmentForm.value

      };

      this.departmentService.updateDepartment(
        updatedDepartment as any
      );

      this.departmentService.selectedDepartment.set(null);

    }

    else {

      const newDepartment = {
        id: this.departmentService.departments().length + 1,
        ...this.departmentForm.value

      };

      this.departmentService.addDepartment(
        newDepartment as any
      );

    }

    this.departmentForm.reset();

  }

}