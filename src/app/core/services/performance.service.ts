import { Injectable, signal } from '@angular/core';
import { Performance } from '../../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  performanceList = signal<Performance[]>([
    {
      id: 1,
      employeeName: 'John Doe',
      rating: 5,
      reviewer: 'Manager A',
      reviewDate: '2026-05-08',
      comments: 'Excellent performance'
    },
    {
      id: 2,
      employeeName: 'Sarah Smith',
      rating: 4,
      reviewer: 'Manager B',
      reviewDate: '2026-05-10',
      comments: 'Very good work'
    }
  ]);

  getPerformance() {
    return this.performanceList;
  }

  addPerformance(performance: Performance) {
    this.performanceList.update(list => [
      ...list,
      performance
    ]);
  }

  updatePerformance(updatedPerformance: Performance) {
    this.performanceList.update(list =>
      list.map(item =>
        item.id === updatedPerformance.id
          ? updatedPerformance
          : item
      )
    );
  }

  deletePerformance(id: number) {
    this.performanceList.update(list =>
      list.filter(item => item.id !== id)
    );
  }
}