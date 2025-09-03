export interface INotificationsService {
  sendEmail(to: string, subject: string, body: string): void;
  notifyMatch(matchId: number): Promise<void>;
}
