import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveUser(user: any): void {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    if(!localStorage.getItem('user')) return null;
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

}