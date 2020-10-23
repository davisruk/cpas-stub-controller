import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DspLiveStatsComponent } from '../component/dsp-live-stats.component';

describe('DspLiveStatsComponent', () => {
  let component: DspLiveStatsComponent;
  let fixture: ComponentFixture<DspLiveStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DspLiveStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DspLiveStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
