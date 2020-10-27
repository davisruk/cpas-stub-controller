import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ViewMessageEffects } from '../store/view-message.effects';


describe('ViewMessageEffects', () => {
  let actions$: Observable<any>;
  let effects: ViewMessageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewMessageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ViewMessageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
