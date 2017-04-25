import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import LoadingSpinner from '../../common/loadingSpinner';
import { AuthModule } from  '../../common/auth.module';
import { environment } from '../../environments/environment';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls:  ['./home.css']
})
export class Home extends LoadingSpinner {
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
    this.getUserDetails();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getUserDetails() {
    this.showSpinner();
    this.authHttp.get(environment.apiUrl + 'api/user')
      .subscribe(
      response => {
        this.hideSpinner();
        this.name = response.json().name;
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }

}
