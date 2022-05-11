export interface NotificationType {
  id?: number;
  content: string;
  type: string;
  isSeen: boolean;
  sentAt: Date;
  eventId: number;
}
