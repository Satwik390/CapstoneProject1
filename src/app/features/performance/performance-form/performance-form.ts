import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { PerformanceService } from '../../../core/services/performance.service';
import { Performance } from '../../../models/performance.model';

@Component({
  selector: 'app-performance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './performance-form.html',
  styleUrl: './performance-form.css'
})
export class PerformanceFormComponent {

  private fb = inject(FormBuilder);
  private performanceService = inject(PerformanceService);

  @Input() selectedPerformance!: Performance | null;

  @Output() clearEdit = new EventEmitter<void>();

  performanceForm = this.fb.group({
    employeeName: ['', Validators.required],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    reviewer: ['', Validators.required],
    reviewDate: ['', Validators.required],
    comments: ['', Validators.required]
  });

  ngOnChanges() {
    if (this.selectedPerformance) {
      this.performanceForm.patchValue({
        employeeName: this.selectedPerformance.employeeName,
        rating: this.selectedPerformance.rating,
        reviewer: this.selectedPerformance.reviewer,
        reviewDate: this.selectedPerformance.reviewDate,
        comments: this.selectedPerformance.comments
      });
    }
  }

  onSubmit() {

    if (this.performanceForm.invalid) {
      this.performanceForm.markAllAsTouched();
      return;
    }

    const performanceData: Performance = {
      id: this.selectedPerformance
        ? this.selectedPerformance.id
        : this.performanceService.getPerformance()().length + 1,

      employeeName: this.performanceForm.value.employeeName!,
      rating: Number(this.performanceForm.value.rating!),
      reviewer: this.performanceForm.value.reviewer!,
      reviewDate: this.performanceForm.value.reviewDate!,
      comments: this.performanceForm.value.comments!
    };

    if (this.selectedPerformance) {
      this.performanceService.updatePerformance(performanceData);
      this.clearEdit.emit();
    } else {
      this.performanceService.addPerformance(performanceData);
    }

    this.performanceForm.reset({
      rating: 1
    });
  }
}