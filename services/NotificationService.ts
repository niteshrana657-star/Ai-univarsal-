export interface NotificationData {
  id: string;
  title: string;
  message: string;
  packageName?: string;
  timestamp: number;
  read: boolean;
}

export class NotificationService {
  private enabled = false;
  private notifications: NotificationData[] = [];
  private maxNotifications = 100;

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getStatus(): string {
    return this.enabled ? "Enabled" : "Disabled";
  }

  addNotification(
    title: string,
    message: string,
    packageName?: string
  ): NotificationData {
    const notification: NotificationData = {
      id: Date.now().toString(),
      title,
      message,
      packageName,
      timestamp: Date.now(),
      read: false,
    };

    this.notifications.unshift(notification);

    if (this.notifications.length > this.maxNotifications) {
      this.notifications.pop();
    }

    return notification;
  }

  getNotifications(): NotificationData[] {
    return [...this.notifications];
  }

  getUnreadNotifications(): NotificationData[] {
    return this.notifications.filter(item => !item.read);
  }

  markAsRead(id: string): boolean {
    const notification = this.notifications.find(
      item => item.id === id
    );

    if (!notification) {
      return false;
    }

    notification.read = true;
    return true;
  }

  removeNotification(id: string): boolean {
    const index = this.notifications.findIndex(
      item => item.id === id
    );

    if (index === -1) {
      return false;
    }

    this.notifications.splice(index, 1);
    return true;
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  search(keyword: string): NotificationData[] {
    const query = keyword.toLowerCase();

    return this.notifications.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.message.toLowerCase().includes(query) ||
      (item.packageName?.toLowerCase().includes(query) ?? false)
    );
  }

  getNotificationCount(): number {
    return this.notifications.length;
  }

  getUnreadCount(): number {
    return this.notifications.filter(item => !item.read).length;
  }

  getLatestNotification(): NotificationData | null {
    return this.notifications.length > 0
      ? this.notifications[0]
      : null;
  }
}

export default new NotificationService();
