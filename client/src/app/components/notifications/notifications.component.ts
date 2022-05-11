import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
  seen: boolean[] = [];
  unseen = 0;

  ngOnInit() {
    //get all notifications
    this.getAllNotifications();
    this.getUnseenCount();

    //listen to notifications update it
    this.webSocketService.notifications$.subscribe({
      next: (res) => {
        this.notifications.unshift(res);
        this.unseen++;
      },
      error: (err) => console.log(err),
    });
  }

  async markAsSeen(id: any) {
    try {
      await lastValueFrom(this.notificationService.markAsSeen(id));
      this.seen[id] = true;
      this.unseen--;
    } catch (err) {
      console.log(err);
    }
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next: (res) => (this.notifications = res),
      error: (err) => console.log(err),
    });
  }

  getUnseenCount() {
    this.notificationService.getUnseenCount().subscribe({
      next: (res) => (this.unseen = res.count),
      error: (err) => console.log(err),
    });
  }
}
