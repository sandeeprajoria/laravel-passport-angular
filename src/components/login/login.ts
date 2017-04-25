import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import LoadingSpinner from '../../common/loadingSpinner';
import { environment } from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls:  ['./login.css']
})
export class Login extends LoadingSpinner {
  constructor(public router: Router, public http: Http) {
    super();
  }

  login(event: Event, username: String, password: String) {
    event.preventDefault();
    let body = JSON.stringify(
      {
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_id': environment.clientId,
        'client_secret': environment.clientSecret,
        'scope': '*'
      });
    this.showSpinner();
    this.http.post(environment.apiUrl + 'oauth/token', body, { headers: contentHeaders })
      .subscribe(
      response => {
        this.hideSpinner();
        localStorage.setItem('token', response.json().access_token);
        localStorage.setItem('jwt_info', response.json());
        this.router.navigate(['home']);
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }
}
