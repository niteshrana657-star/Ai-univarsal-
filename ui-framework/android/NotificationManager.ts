/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * File: NotificationManager.ts
 * -------------------------------------------------------------
 */

export interface NotificationData {

  id: string;

  title: string;

  message: string;

  timestamp: number;

  read: boolean;

}

export class NotificationManager {

  private notifications =
    new Map<string, NotificationData>();

  /**
   * Add Notification
   */
  public add(
    notification: NotificationData
  ): void {

    this.notifications.set(
      notification.id,
      notification
    );

  }

  /**
   * Remove Notification
   */
  public remove(
    id: string
  ): boolean {

    return this.notifications.delete(
      id
    );

  }

  /**
   * Get Notification
   */
  public get(
    id: string
  ): NotificationData | undefined {

    return this.notifications.get(id);

  }

  /**
   * Get All Notifications
   */
  public getAll():
    NotificationData[] {

    return Array.from(
      this.notifications.values()
    );

  }

  /**
   * Mark As Read
   */
  public markAsRead(
    id: string
  ): boolean {

    const notification =
      this.notifications.get(id);

    if (!notification) {

      return false;

    }

    notification.read = true;

    return true;

  }

  /**
   * Unread Count
   */
  public getUnreadCount():
    number {

    return Array.from(
      this.notifications.values()
    ).filter(
      item => !item.read
    ).length;

  }

  /**
   * Clear Notifications
   */
  public clear():
    void {

    this.notifications.clear();

  }

}

const notificationManager =
  new NotificationManager();

export default notificationManager;
