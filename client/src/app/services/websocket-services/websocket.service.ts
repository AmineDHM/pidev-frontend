import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NotificationType } from '../notification-services/notification-type';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  stompClient!: Stomp.Client;

  private notifications: BehaviorSubject<NotificationType[]> =
    new BehaviorSubject<NotificationType[]>([]);

  notifications$: Observable<NotificationType[]> =
    this.notifications.asObservable();

  constructor() {}

  connect(token: string) {
    const socket = new SockJS(`http://127.0.0.1:8080/api/ws?token=${token}`);
    this.stompClient = Stomp.over(socket);

    const _this = this;

    this.stompClient.connect({}, function (frame) {

      _this.stompClient.subscribe(
        '/topic/global-notifications',
        function (message) {
          _this.update(message)
        }
      );

      _this.stompClient.subscribe(
        '/user/topic/private-notifications',
        function (message) {
          _this.update(message)
        }
      );
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.ws.close();
    }
  }

  update(message: Stomp.Message) {
    let value = JSON.parse(message.body);
    this.notifications.next([...this.notifications.getValue().concat(value)]);
  }
}