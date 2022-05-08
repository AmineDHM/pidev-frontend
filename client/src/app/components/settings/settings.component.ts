import { TokenService } from './../../services/auth-services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
