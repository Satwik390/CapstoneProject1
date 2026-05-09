import { Injectable, signal } from '@angular/core';
import { Attendance } from '../../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  attendanceList = signal<Attendance[]>([
    {
      id: 1,
      employeeName: 'John Doe',
      date: '2026-05-08',
      status: 'Present'
    },
    {
      id: 2,
      employeeName: 'Sarah Smith',
      date: '2026-05-08',
      status: 'Absent'
    }
  ]);

  getAttendance() {
    return this.attendanceList;
  }

  addAttendance(attendance: Attendance) {
    this.attendanceList.update(list => [
      ...list,
      attendance
    ]);
  }

  deleteAttendance(id: number) {
    this.attendanceList.update(list =>
      list.filter(att => att.id !== id)
    );
  }

  updateAttendance(updatedAttendance: Attendance) {
    this.attendanceList.update(list =>
      list.map(att =>
        att.id === updatedAttendance.id
          ? updatedAttendance
          : att
      )
    );
  }
}