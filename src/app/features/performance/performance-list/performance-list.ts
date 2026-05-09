import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceService } from '../../../core/services/performance.service';
import { Performance } from '../../../models/performance.model';

import { PerformanceFormComponent } from '../performance-form/performance-form';

@Component({
  selector: 'app-performance-list',
  standalone: true,
  imports: [
    CommonModule,
    PerformanceFormComponent
  ],
  templateUrl: './performance-list.html',
  styleUrl: './performance-list.css'
})
export class PerformanceListComponent {

  private performanceService = inject(PerformanceService);

  performance =
    this.performanceService.getPerformance();

  selectedPerformance =
    signal<Performance | null>(null);

  editPerformance(review: Performance) {
    this.selectedPerformance.set(review);
  }

  deletePerformance(id: number) {
    this.performanceService.deletePerformance(id);
  }

  clearEdit() {
    this.selectedPerformance.set(null);
  }
}