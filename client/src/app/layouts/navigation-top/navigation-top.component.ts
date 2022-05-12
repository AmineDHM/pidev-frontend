import { NotificationService } from './../../services/notification-services/notification.service';
import { TokenService } from './../../services/auth-services/token.service';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket-services/websocket.service';
import { NotificationType } from 'src/app/services/notification-services/notification-type';
import { lastValueFrom } from 'rxjs';

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
  unseen = 0;
  seen: boolean[] = [];

  ngOnInit(): void {
    //get all notifications
    this.getAllNotifications();
    this.getUnseenCount();

    //connect to ws
    this.webSocketService.connect();

    //listen to notifications update it
    this.webSocketService.notifications$.subscribe({
      next: (res) => {
        this.notifications.unshift(res);
        this.unseen++;
      },
      error: (err) => console.log(err),
    });
  }

  highlight(id: any) {
    this.highlighted[id] = true;
  }

  removeHightlight(id: any) {
    this.highlighted[id] = false;
  }

  async markAsSeen(id: any) {
    try {
      await lastValueFrom(this.notificationService.markAsSeen(id));
      if(!this.seen[id]) this.seen[id] = true;
      this.seen[id] = true;
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
