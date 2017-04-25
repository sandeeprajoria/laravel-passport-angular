import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
		globalHeaders: [{'Content-Type':'application/json'}]
	}), http, options);
}

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    { 
      provide: XSRFStrategy, 
      useFactory: () => new CookieXSRFStrategy('XSRF-TOKEN', 'X-CSRF-TOKEN')
    }
  ]
})

export class AuthModule {}
