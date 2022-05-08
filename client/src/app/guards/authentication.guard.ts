import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/auth-services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate() {
    if (this.tokenService.getUser()?.accessToken) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}