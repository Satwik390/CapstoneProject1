import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceService } from '../../../core/services/attendance.service';
import { Attendance } from '../../../models/attendance.model';

import { AttendanceFormComponent } from '../attendance-form/attendance-form';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    AttendanceFormComponent
  ],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css'
})
export class AttendanceListComponent {

  private attendanceService = inject(AttendanceService);

  attendance =
    this.attendanceService.getAttendance();

  selectedAttendance =
    signal<Attendance | null>(null);

  deleteAttendance(id: number) {

    this.attendanceService.deleteAttendance(id);

  }

  editAttendance(attendance: Attendance) {

    this.selectedAttendance.set(attendance);

  }

  clearEdit() {

    this.selectedAttendance.set(null);

  }

}