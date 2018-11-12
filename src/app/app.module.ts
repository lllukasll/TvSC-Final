import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';
import { TvSeriesModule } from './_tvSeries/tv-series.module';
import { UserModule } from './_user/user.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import * as fromRoot from './reducers/index';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './_admin/admin.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    TvSeriesModule,
    AdminModule,
    CoreModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromRoot.reducers),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
