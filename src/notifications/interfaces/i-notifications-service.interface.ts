export interface INotificationsService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  notifyMatch(matchId: number): Promise<void>;
}
