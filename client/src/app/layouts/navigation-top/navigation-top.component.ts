import { NotificationService } from './../../services/notification-services/notification.service';
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
    private notificationService: NotificationService
  ) {}

  notifications: NotificationType[] = [];
  highlighted: boolean[] = [];

  ngOnInit(): void {
    //get all notifications
    this.notificationService.getAllNotifications().subscribe({
      next: (res) => {
        this.notifications = res;
      },
      error: (err) => console.log(err),
    });

    //connect to ws
    this.webSocketService.connect();

    //listen to notifications update it
    this.webSocketService.notifications$.subscribe({
      next: (res) => this.notifications.unshift(res),
      error: (err) => console.log(err),
    });
  }

  highlight(id: any) {
    this.highlighted[id] = true;
  }

  removeHightlight(id: any) {
    this.highlighted[id] = false;
  }
}
