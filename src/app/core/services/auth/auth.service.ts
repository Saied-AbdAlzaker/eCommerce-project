import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: WritableSignal<any> = signal(null);
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly id = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem('token') !== null) {
        this.userInfo();
      }
    }
  }

  userInfo() {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.user.set(decoded);
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signup`, data);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signin`, data);
  }
  logout() {
    localStorage.clear();
    this.user.set(null);
    this.router.navigate(['/login']);
  }
  // logout(): void {
  //   this.cookieService.delete('token');
  //   this.router.navigate(['/login']);
  // }
  // decodeToken() {
  //   let token;
  //   try {
  //     token = jwtDecode(this.cookieService.get('token'));
  //   } catch (error) {
  //     this.logout();
  //   }
  //   return token;
  // }

  verifyEmail(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPasswords`, data);
  }
  verifyCode(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/verifyResetCode`, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}auth/resetPassword`, data);
  }

}
