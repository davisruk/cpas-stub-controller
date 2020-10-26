import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToteSummaryComponent } from '../component/tote-summary.component';

describe('ToteSummaryComponent', () => {
  let component: ToteSummaryComponent;
  let fixture: ComponentFixture<ToteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToteSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
