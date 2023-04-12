import { TestBed } from '@angular/core/testing';
import { pieChartComponent } from './pieChart.component';

describe('pieChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [pieChartComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(pieChartComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
