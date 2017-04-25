import { Component } from '@angular/core';
import { XSRFStrategy, Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import LoadingSpinner from '../../common/loadingSpinner';
import { environment } from '../../environments/environment';
import { contentHeaders } from '../../common/headers';


@Component({
  selector: 'clients',
  templateUrl: './clients.html',
  styleUrls:  ['./clients.css']
})
export class Clients extends LoadingSpinner {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  name: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    super();
    this.jwt = localStorage.getItem('token');
    this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
    this.getClients();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getClients() {
    this.showSpinner();
    this.authHttp.get(environment.apiUrl + 'oauth/clients')
      .subscribe(
      response => {
        this.hideSpinner();
        console.log(response.json());
      },
      error => {
        this.hideSpinner();
        //alert((JSON.parse(error.text())).message);
        console.log(error);
      }
      );
  }

}
