import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {JwtInterceptor} from './interceptor/jwt.interceptor';
import {TokenExpirationInterceptor} from './interceptor/token-expiration.interceptor';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginModule} from './login/login.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {FlexModule} from '@angular/flex-layout';
import {OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {DateFormatHttpInterceptor} from './interceptor/date-format-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    DashboardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.enableServiceWorkers}),
    MatProgressBarModule,
    OwlNativeDateTimeModule,
    FlexModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpirationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateFormatHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
