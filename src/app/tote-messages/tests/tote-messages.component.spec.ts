import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToteMessagesComponent } from '../component/tote-messages.component';


describe('ToteMessagesComponent', () => {
  let component: ToteMessagesComponent;
  let fixture: ComponentFixture<ToteMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToteMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToteMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
