import { JsonPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgIf, RouterLink, RouterOutlet, JsonPipe],
})
export class AppComponent implements OnInit {
  title = 'auth0-angular';

  isAuthenticated = false;

  data: any;

  userData: any;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((response: LoginResponse) => {
        this.isAuthenticated = response.isAuthenticated;
        this.userData = response.userData;
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe();
  }

  getData() {
    this.httpClient
      .get<any[]>('https://localhost:5001/weatherForecast')
      .subscribe((data) => {
        this.data = data;
      });
  }
}
