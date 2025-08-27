import { Injectable } from '@nestjs/common';
import { INotificationsService } from './interfaces/i-notifications-service.interface';

@Injectable()
export class NotificationsService implements INotificationsService {
  sendEmail(to: string, subject: string, body: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  notifyMatch(matchId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
