import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFilesDialogComponent } from '../component/choose-files-dialog/choose-files-dialog.component';

describe('ChooseFilesDialogComponent', () => {
  let component: ChooseFilesDialogComponent;
  let fixture: ComponentFixture<ChooseFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFilesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
