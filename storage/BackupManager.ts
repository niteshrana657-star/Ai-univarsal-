/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Storage Module
 * File: BackupManager.ts
 * -------------------------------------------------------------
 */

import LocalStorage from "./LocalStorage";

export interface BackupData {

  id: string;

  createdAt: number;

  records: unknown[];

}

export class BackupManager {

  /**
   * Create Backup
   */
  public createBackup():
    BackupData {

    const backup: BackupData = {

      id:
        `backup-${Date.now()}`,

      createdAt:
        Date.now(),

      records:
        LocalStorage.getAll()

    };

    LocalStorage.set(
      `backup:${backup.id}`,
      backup
    );

    return backup;

  }

  /**
   * Restore Backup
   */
  public restoreBackup(
    backupId: string
  ): boolean {

    const backup =
      this.getBackup(
        backupId
      );

    if (!backup) {

      return false;

    }

    LocalStorage.clear();

    for (
      const record of backup.records as any[]
    ) {

      LocalStorage.set(
        record.key,
        record.value
      );

    }

    return true;

  }

  /**
   * Get Backup
   */
  public getBackup(
    backupId: string
  ): BackupData | null {

    return LocalStorage.get<BackupData>(
      `backup:${backupId}`
    );

  }

  /**
   * List Backups
   */
  public getBackups():
    BackupData[] {

    return LocalStorage
      .getAll()
      .filter(record =>
        record.key.startsWith(
          "backup:"
        )
      )
      .map(record =>
        record.value as BackupData
      );

  }

  /**
   * Delete Backup
   */
  public deleteBackup(
    backupId: string
  ): boolean {

    return LocalStorage.remove(
      `backup:${backupId}`
    );

  }

  /**
   * Backup Count
   */
  public count():
    number {

    return this.getBackups()
      .length;

  }

  /**
   * Clear All Backups
   */
  public clear(): void {

    const backups =
      this.getBackups();

    for (
      const backup of backups
    ) {

      LocalStorage.remove(
        `backup:${backup.id}`
      );

    }

  }

}

const backupManager =
  new BackupManager();

export default backupManager;
