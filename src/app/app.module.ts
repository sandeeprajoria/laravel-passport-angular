import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XSRFStrategy, CookieXSRFStrategy  } from '@angular/http';
import { RouterModule } from '@angular/router';
import { JwtHelper, AuthConfig, AuthHttp } from 'angular2-jwt';


import { AuthGuard } from '../common/auth.guard';
import { AppComponent } from './app.component';
import { Home } from '../components/home';
import { Login } from '../components/login';
import { Spinner } from '../spinner';
import { AuthorizedClients } from '../components/authorized-clients';
import { Clients } from '../components/clients';
import { PersonalAccessTokens } from '../components/personal-access-tokens';

import { routes } from './app.routes';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
		globalHeaders: [{'Content-Type':'application/json', 'X-Requested-With': 'XMLHttpRequest'}]
	}), http, options);
}

export function xsrfFactory() {
    return new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN');
}

@NgModule({
  declarations: [
    Home, Login, Spinner, AuthorizedClients, Clients, PersonalAccessTokens, AppComponent
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    AuthGuard,
    JwtHelper,
    { 
      provide: XSRFStrategy, 
      useFactory: xsrfFactory
    }, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
