import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient,private router:Router) {}

  login(body:User): Observable<{token:string}> {
    return this.http.post<{token:string}>(this.loginUrl, body,
      {headers: { 'x-api-key': 'reqres-free-v1'}});
    }
  

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
