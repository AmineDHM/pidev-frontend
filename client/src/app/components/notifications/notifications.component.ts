import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/services/notification-services/notification-type';
import { NotificationService } from 'src/app/services/notification-services/notification.service';
import { WebsocketService } from 'src/app/services/websocket-services/websocket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private webSocketService: WebsocketService
  ) {}

  notifications: NotificationType[] = [];

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

  markAsSeen(id: number | undefined) {
    this.notificationService.markAsSeen(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
}
