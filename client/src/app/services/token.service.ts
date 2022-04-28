import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    if(!sessionStorage.getItem('user')) return null;
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  /* public getToken(): string | null {

  } */
}
