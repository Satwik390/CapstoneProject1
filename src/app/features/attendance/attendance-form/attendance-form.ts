import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AttendanceService } from '../../../core/services/attendance.service';
import { Attendance } from '../../../models/attendance.model';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './attendance-form.html',
  styleUrl: './attendance-form.css'
})
export class AttendanceFormComponent {

  private fb = inject(FormBuilder);
  private attendanceService = inject(AttendanceService);

  @Input() selectedAttendance!: Attendance | null;

  @Output() clearEdit = new EventEmitter<void>();

  attendanceForm = this.fb.group({
    employeeName: ['', Validators.required],
    date: ['', Validators.required],
    status: ['', Validators.required]
  });

  ngOnChanges() {

    if (this.selectedAttendance) {

      this.attendanceForm.patchValue({
        employeeName: this.selectedAttendance.employeeName,
        date: this.selectedAttendance.date,
        status: this.selectedAttendance.status
      });

    }

  }

  onSubmit() {

    if (this.attendanceForm.invalid) {
      return;
    }

    const attendanceData: Attendance = {
      id: this.selectedAttendance
        ? this.selectedAttendance.id
        : this.attendanceService.attendanceList().length + 1,
      employeeName:
        this.attendanceForm.value.employeeName!,

      date:
        this.attendanceForm.value.date!,

      status:
        this.attendanceForm.value.status!
    };

    if (this.selectedAttendance) {

      this.attendanceService.updateAttendance(attendanceData);

      this.clearEdit.emit();

    } else {

      this.attendanceService.addAttendance(attendanceData);

    }

    this.attendanceForm.reset();

  }

}