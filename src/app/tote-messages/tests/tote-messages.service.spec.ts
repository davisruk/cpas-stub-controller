import { TestBed } from '@angular/core/testing';
import { ToteMessagesService } from '../services/tote-messages.service';


describe('ToteMessagesService', () => {
  let service: ToteMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToteMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
