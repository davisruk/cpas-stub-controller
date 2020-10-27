import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ToteMessagesEffects } from '../store/tote-messages.effects';


describe('ToteMessagesEffects', () => {
  let actions$: Observable<any>;
  let effects: ToteMessagesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToteMessagesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ToteMessagesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
