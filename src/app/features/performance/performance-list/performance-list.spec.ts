import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceList } from './performance-list';

describe('PerformanceList', () => {
  let component: PerformanceList;
  let fixture: ComponentFixture<PerformanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceList],
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
