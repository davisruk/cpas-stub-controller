import { selectConfigFeature, selectFMD } from './config.selectors';
import { ConfigService } from './../services/config.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { sendConfig, sendConfigSuccess } from './config.actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';



@Injectable()
export class ConfigEffects {

  sendConfig$ = createEffect(() => this.actions$.pipe(
      ofType(sendConfig),
      withLatestFrom(this.store.select(selectConfigFeature)),
      mergeMap(([action, config]) => this.configService.postConfig(config).pipe(
        map(configReturn => sendConfigSuccess({config: configReturn}))
      ))
    )
  );


  constructor(private actions$: Actions, private configService: ConfigService, private store: Store<AppState>) {}

}
