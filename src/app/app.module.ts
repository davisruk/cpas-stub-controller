import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/component/config.component';
import { ConfigEffects } from './config/store/config.effects';
import { CustomBreakPointsProvider } from './dashboard/custom-breakpoints';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DspLiveStatsComponent } from './dsp-live-stats/component/dsp-live-stats.component';
import { DspLiveStatsEffects } from './dsp-live-stats/store/dsp-live-stats.effects';
import { metaReducers, reducers } from './reducers';
import { ToteMessagesComponent } from './tote-messages/component/tote-messages.component';
import { ToteMessagesEffects } from './tote-messages/store/tote-messages.effects';
import { ToteSummaryComponent } from './tote-summary/component/tote-summary.component';
import { ToteSummaryEffects } from './tote-summary/store/tote-summary.effects';
import { ChooseFilesDialogComponent } from './upload/component/choose-files-dialog.component';
import { ViewMessageComponent } from './view-message/component/view-message.component';
import { ViewMessageEffects } from './view-message/store/view-message.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfigComponent,
    DspLiveStatsComponent,
    ChooseFilesDialogComponent,
    ToteSummaryComponent,
    ToteMessagesComponent,
    ViewMessageComponent
  ],
  imports: [
    MatToolbarModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([ConfigEffects, ToteSummaryEffects, ToteMessagesEffects, ViewMessageEffects, DspLiveStatsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    LayoutModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [CustomBreakPointsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
