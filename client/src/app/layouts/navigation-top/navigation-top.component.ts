import { TokenService } from './../../services/auth-services/token.service';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket-services/websocket.service';
import { NotificationType } from 'src/app/services/notification-services/notification-type';

@Component({
  selector: 'app-navigation-top',
  templateUrl: './navigation-top.component.html',
  styleUrls: ['./navigation-top.component.css'],
})
export class NavigationTopComponent implements OnInit {
  constructor(
    private webSocketService: WebsocketService,
    private tokenService: TokenService
  ) {}

  notifications: NotificationType[] = [];

  ngOnInit(): void {
    const currentUser = this.tokenService.getUser();
    if (currentUser) {
      this.webSocketService.connect(currentUser?.accessToken);
    }
    
    //listen to notifications update it
    this.webSocketService.notifications$.subscribe({
      next: (res) => (this.notifications = res),
    });
  }

  toggleChat() {}
}
