import { NotificationType } from './../../services/notification-type';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  isLoggedIn = false;
  notifications: NotificationType[] = [];
  isConnected = false;
  show: boolean = false

  constructor(
    private tokenService: TokenService,
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  connect(token: string) {
    this.websocketService.connect(token);
    this.isConnected = true;
  }

  disconnect() {
    this.websocketService.disconnect();
    this.isConnected = false;
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser();
      this.isLoggedIn = true;
      this.connect(this.currentUser.accessToken);
    }

    //listen to notifications update it
    this.websocketService.notifications$.subscribe({
      next: (res) => (this.notifications = res),
    });
  }
}
